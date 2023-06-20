import { LANGUAGE } from '../constants/lang.enum';

export type IErrorMessage = {
  [k: number]: {
    [LANGUAGE.AR]: string;
    [LANGUAGE.EN]: string;
  };
};
