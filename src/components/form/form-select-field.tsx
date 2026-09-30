import { Controller, type Control, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';

import { FormSelect, type FormSelectProps } from '@/components/form/form-select';

type FormSelectFieldProps<TFieldValues extends FieldValues> = Omit<
  FormSelectProps,
  'error' | 'onBlur' | 'onChangeText' | 'onValueChange' | 'value'
> & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
};

export function FormSelectField<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: FormSelectFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormSelect
          {...props}
          ref={field.ref}
          value={typeof field.value === 'string' || typeof field.value === 'number' ? field.value : undefined}
          onValueChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export default FormSelectField;
