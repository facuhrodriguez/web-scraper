export const VALIDATIONS_REPOSITORY = 'VALIDATIONS_REPOSITORY';

export interface IValidationsRepository {
  validation: (data: unknown, toValidate: string[]) => ValidatorResponse;
}

export type ValidatorResponse = {
  errors?: object;
  isValid: boolean;
};
