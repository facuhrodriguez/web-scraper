/* eslint-disable @typescript-eslint/no-explicit-any */
import validator from 'validator';
import { IValidationsRepository, ValidatorResponse } from '@/domain/models/gateways';

export class ValidatorAdapter implements IValidationsRepository {
  validation(data: any, toValidate: string[]): ValidatorResponse {
    const errors = {};

    if (toValidate.includes('email') && !validator.isEmail(data.email)) {
      errors['email'] = 'Email is invalid';
    }

    for (const key in data) {
      if (toValidate.includes(key) && validator.isEmpty(data[key])) {
        errors[key] = `${key} is required`;
      }
    }

    return {
      errors,
      isValid: this.isValid(errors),
    };
  }

  isValid(value: any): boolean {
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    ) {
      return true;
    }
  }
}
