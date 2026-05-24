type ValidatorFn = (value: string) => string | undefined;

type ValidationRules = {
  isRequired?: boolean;
  isEmail?: boolean;
  isPassword?: boolean;
  isText?: boolean;
};

type FieldConfig = {
  rules: ValidationRules;
  custom?: ValidatorFn;
};

type ValidationSchema = Record<string, FieldConfig>;

type FieldState = {
  value: string;
  setValue: (value: string) => void;
  validate: ValidatorFn;
};

type ValidationResult<T extends ValidationSchema> = {
  fields: { [K in keyof T]: FieldState };
  isFormValid: boolean;
  getErrors: () => Partial<Record<keyof T, string>>;
};

export type { ValidatorFn, ValidationRules, FieldConfig, ValidationSchema, FieldState, ValidationResult };
