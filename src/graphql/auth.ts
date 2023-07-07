import { gql } from '@apollo/client';

export const SEND_PHONE_CAPTCHA = gql`
  mutation sendPhoneCaptcha($phoneNumber: String!) {
    sendPhoneCaptcha(phoneNumber: $phoneNumber) {
      code
      message
    }
  }
`;
