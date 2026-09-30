import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Task } from '@/features/tareas/types/task';
import { useTheme } from '@/hooks/use-theme';

const statusLabels = {
  PENDIENTE: 'Pendiente',
  EN_PROGRESO: 'En progreso',
  COMPLETADA: 'Completada',
} as const;

const priorityColors = {
  BAJA: '#2f9e44',
  MEDIA: '#d97706',
  ALTA: '#dc2626',
} as const;

type TaskCardProps = {
  task: Task;
  onPress: () => void;
};

export function TaskCard({ task, onPress }: TaskCardProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.title} numberOfLines={1}>
            {task.titulo}
          </ThemedText>
          <View style={[styles.priorityDot, { backgroundColor: priorityColors[task.prioridad] }]} />
        </View>
        <ThemedText themeColor="textSecondary" numberOfLines={2}>
          {task.descripcion || 'Sin descripción'}
        </ThemedText>
        <View style={styles.footer}>
          <ThemedText type="smallBold">{statusLabels[task.estado]}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Vence {formatDate(task.fechaVencimiento)}
          </ThemedText>
        </View>
        <View style={[styles.accent, { backgroundColor: theme.text }]} />
      </ThemedView>
    </Pressable>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

const styles = StyleSheet.create({
  pressable: { marginBottom: Spacing.two },
  pressed: { opacity: 0.72 },
  card: { padding: Spacing.three, borderRadius: Spacing.two, gap: Spacing.two, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  title: { fontSize: 20, lineHeight: 26, flex: 1 },
  priorityDot: { width: 10, height: 10, borderRadius: 5 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Spacing.two },
  accent: { height: 3, width: 48, position: 'absolute', left: 0, top: 0 },
});