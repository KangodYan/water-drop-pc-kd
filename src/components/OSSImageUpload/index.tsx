import type { UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
  Upload,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '@/graphql/oss';

// 调用API的返回类型定义
interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

// 标签属性的类型定义
interface OSSUploadProps {
  value?: UploadFile[];
  label?: string;
  maxCount?: number;
  imgCropAspect?: number;
  onChange?: (files: UploadFile[]) => void;
}

// 整体逻辑，接参、处理、返回
const OSSImageUpload = ({
  label,
  maxCount,
  imgCropAspect,
  value,
  onChange,
}: OSSUploadProps) => {
  const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);

  const OSSData = data?.getOSSInfo;

  // 对调用OSS上传API返回的数据，做key和url处理
  const getKey = (file: UploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const key = `${OSSData?.dir}${file.uid}${suffix}`;
    const url = `${OSSData?.host}/${key}`;
    return { key, url };
  };

  /**
   * 上传文件改变时的回调
   */
  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    const files = fileList.map((f) => ({
      ...f,
      url: f.url || getKey(f).url,
    }));
    onChange?.(files);
  };

  /**
   * 上传所需额外参数或返回上传额外参数的方法
   */
  const getExtraData: UploadProps['data'] = (file) => ({
    key: getKey(file).key,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  /**
   * 上传文件之前的处理
   */
  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await refetch();
    }
    return file;
  };

  // 返回antd读取的图片标签对象及属性函数
  return (
    // [可裁切图片的组件]详见antd-img-crop：https://github.com/nanxiaobei/antd-img-crop
    <ImgCrop rotate aspect={imgCropAspect}>
      {/* [文件上传组件]详见antd-上传：https://ant.design/components/upload-cn#api */}
      <Upload
        name="file"
        maxCount={maxCount}
        listType="picture-card"
        fileList={value}
        action={OSSData?.host}
        onChange={handleChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
      >
        {label}
      </Upload>
    </ImgCrop>
  );
};

// 标签栏默认属性
OSSImageUpload.defaultProps = {
  label: '上传图片',
  value: null,
  onChange: () => {},
  maxCount: 1,
  imgCropAspect: 1 / 1,
};
export default OSSImageUpload;
