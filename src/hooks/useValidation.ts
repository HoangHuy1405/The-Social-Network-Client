import { useState, useMemo, useCallback } from "react";
import type { ValidatorFn, ValidationRules, ValidationSchema, FieldState, ValidationResult } from "@/types/validation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const builtInRules: Record<keyof ValidationRules, (label: string) => ValidatorFn> = {
  isRequired: (label) => (value) => {
    if (!value || value.trim() === "") return `${label} is required`;
    return undefined;
  },
  isEmail: () => (value) => {
    if (value && !EMAIL_REGEX.test(value)) return "Invalid email address";
    return undefined;
  },
  isPassword: () => (value) => {
    if (value && value.length < MIN_PASSWORD_LENGTH) return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    return undefined;
  },
  isText: (label) => (value) => {
    if (value && !/^[\p{L}\p{N}\s.\-_]+$/u.test(value)) return `${label} contains invalid characters`;
    return undefined;
  },
};

export const createValidator = (label: string, rules: ValidationRules, custom?: ValidatorFn): ValidatorFn => {
  const pipeline: ValidatorFn[] = [];

  // isRequired always runs first
  for (const [rule, enabled] of Object.entries(rules) as [keyof ValidationRules, boolean | undefined][]) {
    if (enabled) pipeline.push(builtInRules[rule](label));
  }

  if (custom) pipeline.push(custom);

  return (value: string): string | undefined => {
    for (const check of pipeline) {
      const error = check(value);
      if (error) return error;
    }
    return undefined;
  };
};

export const useValidation = <T extends ValidationSchema>(schema: T): ValidationResult<T> => {
  const fieldEntries = Object.entries(schema) as [keyof T & string, T[keyof T]][];

  // Capitalize first letter of field name for label: "firstName" -> "First Name"
  const toLabel = (key: string): string =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase())
      .trim();

  const validators = useMemo(() => {
    const map = {} as Record<keyof T, ValidatorFn>;
    for (const [key, config] of fieldEntries) {
      map[key] = createValidator(toLabel(key), config.rules, config.custom);
    }
    return map;
  }, []); // schema is static per component mount

  const stateEntries = fieldEntries.map(([key]) => {
    const [value, setValue] = useState("");
    return [key, value, setValue] as const;
  });

  const fields = useMemo(() => {
    const result = {} as { [K in keyof T]: FieldState };
    for (const [key, value, setValue] of stateEntries) {
      result[key] = { value, setValue, validate: validators[key] };
    }
    return result;
  }, [...stateEntries.map(([, v]) => v), validators]);

  const isFormValid = useMemo(
    () => stateEntries.every(([key, value]) => validators[key](value) === undefined),
    [...stateEntries.map(([, v]) => v), validators],
  );

  const getErrors = useCallback((): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};
    for (const [key, value] of stateEntries) {
      const error = validators[key](value);
      if (error) errors[key] = error;
    }
    return errors;
  }, [...stateEntries.map(([, v]) => v), validators]);

  return { fields, isFormValid, getErrors };
};
