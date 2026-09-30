import { MaterialCommunityIcons } from '@expo/vector-icons';
import { forwardRef, useState, type ReactNode } from 'react';
import { View, type TextInput as NativeTextInput } from 'react-native';
import {
    HelperText,
    Menu,
    TextInput,
    type TextInputProps,
} from 'react-native-paper';

export type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

export type FormSelectProps = Omit<
  TextInputProps,
  'error' | 'label' | 'left' | 'mode' | 'right' | 'value' | 'onChangeText' | 'editable'
> & {
  className?: string;
  label?: string;
  icon?: ReactNode;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string | number;
  onChangeText?: (value: string) => void;
  onValueChange?: (value: string) => void;
  mode?: 'flat' | 'outlined';
};

export const FormSelect = forwardRef<NativeTextInput, FormSelectProps>(
  (
    {
      className,
      label,
      icon,
      error,
      helperText,
      options,
      placeholder = 'Selecciona una opción',
      value,
      onChangeText,
      onValueChange,
      mode = 'outlined',
      onBlur,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const selectedOption = options.find((option) => String(option.value) === String(value));

    function openMenu() {
      setVisible(true);
    }

    function closeMenu() {
      setVisible(false);
      onBlur?.({} as never);
    }

    function selectOption(option: SelectOption) {
      const selectedValue = String(option.value);
      setVisible(false);
      onChangeText?.(selectedValue);
      onValueChange?.(selectedValue);
      onBlur?.({} as never);
    }

    return (
      <View className={`w-full ${className ?? ''}`}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TextInput
              {...props}
              ref={ref}
              label={label}
              mode={mode}
              value={selectedOption?.label ?? ''}
              placeholder={placeholder}
              error={Boolean(error)}
              editable={false}
              showSoftInputOnFocus={false}
              onPressIn={openMenu}
              left={
                icon ? (
                  <TextInput.Icon
                    icon={() => <View className="items-center justify-center">{icon}</View>}
                    forceTextInputFocus={false}
                  />
                ) : undefined
              }
              right={
                <TextInput.Icon
                  icon={({ color, size }) => (
                    <MaterialCommunityIcons name="menu-down" color={color} size={size} />
                  )}
                  onPress={openMenu}
                  forceTextInputFocus={false}
                  accessibilityLabel="Abrir opciones"
                />
              }
            />
          }
        >
          {options.map((option) => (
            <Menu.Item
              key={String(option.value)}
              title={option.label}
              disabled={option.disabled}
              onPress={() => selectOption(option)}
            />
          ))}
        </Menu>
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

FormSelect.displayName = 'FormSelect';

export default FormSelect;
