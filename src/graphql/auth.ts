import { gql } from '@apollo/client';

export const SEND_PHONE_CAPTCHA = gql`
  mutation sendPhoneCaptcha($phoneNumber: String!) {
    sendPhoneCaptcha(phoneNumber: $phoneNumber) {
      code
      message
    }
  }
`;

export const LOGIN = gql`
  mutation login($phoneNumber: String!, $code: String!) {
    login(phoneNumber: $phoneNumber, code: $code) {
      code
      message
    }
  }
`;
