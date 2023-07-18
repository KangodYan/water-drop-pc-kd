import { LOCAL_CURRENT_ORG } from '@/utils/constants';

/**
 * 返回JSON数据，是为localStorage中的当前门店
 */
export const currentOrg = () => {
  try {
    const res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || '');
    return res;
  } catch {
    return undefined;
  }
};
