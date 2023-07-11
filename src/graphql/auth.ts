import { gql } from '@apollo/client';

export const SEND_PHONE_CAPTCHA = gql`
  mutation sendPhoneCaptcha($tel: String!) {
    sendPhoneCaptcha(tel: $tel) {
      code
      message
    }
  }
`;

export const LOGIN = gql`
  mutation login($tel: String!, $code: String!) {
    login(tel: $tel, code: $code) {
      code
      message
      data
    }
  }
`;
