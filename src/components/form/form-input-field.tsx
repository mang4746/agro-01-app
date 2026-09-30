import { Controller, type Control, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';

import { FormInput, type FormInputProps } from '@/components/form/form-input';

type FormInputFieldProps<TFieldValues extends FieldValues> = Omit<
  FormInputProps,
  'error' | 'onBlur' | 'onChangeText' | 'value'
> & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
};

export function FormInputField<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: FormInputFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormInput
          {...props}
          ref={field.ref}
          value={typeof field.value === 'string' ? field.value : ''}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export default FormInputField;
