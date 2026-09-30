import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { TASK_PRIORITIES, TASK_STATUSES, type TaskPayload } from '@/features/tareas/types/task';
import { useTheme } from '@/hooks/use-theme';

type TaskFormProps = {
  initialValues?: Partial<TaskPayload>;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (payload: TaskPayload) => Promise<void>;
};

export function TaskForm({ initialValues, submitLabel, isSubmitting, onSubmit }: TaskFormProps) {
  const theme = useTheme();
  const [values, setValues] = useState<TaskPayload>({
    titulo: initialValues?.titulo ?? '',
    descripcion: initialValues?.descripcion ?? '',
    estado: initialValues?.estado ?? 'PENDIENTE',
    prioridad: initialValues?.prioridad ?? 'MEDIA',
    fechaVencimiento: initialValues?.fechaVencimiento?.slice(0, 10) ?? '',
  });
  const [validationError, setValidationError] = useState<string>();

  const update = <T extends keyof TaskPayload>(field: T, value: TaskPayload[T]) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  async function handleSubmit() {
    if (!values.titulo.trim()) {
      setValidationError('El título es obligatorio.');
      return;
    }
    if (!values.fechaVencimiento || !/^\d{4}-\d{2}-\d{2}$/.test(values.fechaVencimiento)) {
      setValidationError('Indica una fecha válida con formato AAAA-MM-DD.');
      return;
    }
    setValidationError(undefined);
    await onSubmit({ ...values, titulo: values.titulo.trim(), descripcion: values.descripcion.trim() });
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <FieldLabel label="Título" />
      <TextInput
        value={values.titulo}
        onChangeText={(value) => update('titulo', value)}
        placeholder="Ej. Implementar autenticación"
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text, borderColor: theme.backgroundSelected }]}
      />

      <FieldLabel label="Descripción" />
      <TextInput
        value={values.descripcion}
        onChangeText={(value) => update('descripcion', value)}
        placeholder="Describe el trabajo a realizar"
        placeholderTextColor={theme.textSecondary}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        style={[styles.input, styles.multiline, { color: theme.text, borderColor: theme.backgroundSelected }]}
      />

      <FieldLabel label="Estado" />
      <View style={styles.options}>
        {TASK_STATUSES.map((status) => (
          <Option key={status} label={status.replace('_', ' ')} selected={values.estado === status} onPress={() => update('estado', status)} />
        ))}
      </View>

      <FieldLabel label="Prioridad" />
      <View style={styles.options}>
        {TASK_PRIORITIES.map((priority) => (
          <Option key={priority} label={priority} selected={values.prioridad === priority} onPress={() => update('prioridad', priority)} />
        ))}
      </View>

      <FieldLabel label="Fecha de vencimiento" />
      <TextInput
        value={values.fechaVencimiento}
        onChangeText={(value) => update('fechaVencimiento', value)}
        placeholder="AAAA-MM-DD"
        placeholderTextColor={theme.textSecondary}
        keyboardType="numbers-and-punctuation"
        style={[styles.input, { color: theme.text, borderColor: theme.backgroundSelected }]}
      />

      {validationError && <ThemedText style={styles.error}>{validationError}</ThemedText>}
      <Pressable disabled={isSubmitting} onPress={() => void handleSubmit()} style={({ pressed }) => [styles.submit, pressed && styles.pressed, isSubmitting && styles.disabled]}>
        <ThemedText style={styles.submitText}>{isSubmitting ? 'Guardando...' : submitLabel}</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <ThemedText type="smallBold" style={styles.label}>{label}</ThemedText>;
}

function Option({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.option, selected && styles.optionSelected]}>
      <ThemedText type="smallBold" style={selected && styles.optionTextSelected}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.four, gap: Spacing.two, paddingBottom: Spacing.six },
  label: { marginTop: Spacing.two },
  input: { minHeight: 48, borderWidth: 1, borderRadius: Spacing.two, paddingHorizontal: Spacing.three, fontSize: 16 },
  multiline: { minHeight: 112, paddingTop: Spacing.two },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  option: { borderWidth: 1, borderColor: '#c7c9d1', borderRadius: Spacing.two, paddingHorizontal: Spacing.three, paddingVertical: Spacing.two },
  optionSelected: { backgroundColor: '#20242d', borderColor: '#20242d' },
  optionTextSelected: { color: '#ffffff' },
  error: { color: '#dc2626', marginTop: Spacing.two },
  submit: { backgroundColor: '#20242d', borderRadius: Spacing.two, alignItems: 'center', paddingVertical: Spacing.three, marginTop: Spacing.three },
  submitText: { color: '#ffffff', fontWeight: '700' },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.5 },
});