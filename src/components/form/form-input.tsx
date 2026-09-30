import { MaterialCommunityIcons } from '@expo/vector-icons';
import { forwardRef, useState, type ReactNode } from 'react';
import { View, type TextInput as NativeTextInput } from 'react-native';
import {
    HelperText,
    TextInput,
    type TextInputProps,
} from 'react-native-paper';

export type FormInputProps = Omit<
  TextInputProps,
  'error' | 'label' | 'left' | 'mode' | 'right'
> & {
  className?: string;
  label?: string;
  icon?: ReactNode;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
  mode?: 'flat' | 'outlined';
};

export const FormInput = forwardRef<NativeTextInput, FormInputProps>(
  (
    {
      className,
      label,
      icon,
      error,
      helperText,
      showPasswordToggle = false,
      secureTextEntry,
      mode = 'outlined',
      onChangeText,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = secureTextEntry === true;
    const shouldHideText = isPassword && !isPasswordVisible;

    return (
      <View className={`w-full ${className ?? ''}`}>
        <TextInput
          {...props}
          ref={ref}
          label={label}
          mode={mode}
          error={Boolean(error)}
          secureTextEntry={shouldHideText}
          onChangeText={onChangeText}
          left={
            icon ? (
              <TextInput.Icon
                icon={() => <View className="items-center justify-center">{icon}</View>}
                forceTextInputFocus={false}
              />
            ) : undefined
          }
          right={
            showPasswordToggle && isPassword ? (
              <TextInput.Icon
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    color={color}
                    size={size}
                  />
                )}
                onPress={() => setIsPasswordVisible((visible) => !visible)}
                accessibilityLabel={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              />
            ) : undefined
          }
        />
        <HelperText type="error" visible={Boolean(error)}>
          {error}
        </HelperText>
        {!error && helperText ? (
          <HelperText type="info" visible>
            {helperText}
          </HelperText>
        ) : null}
      </View>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
