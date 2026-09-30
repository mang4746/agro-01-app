import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { TaskForm } from '@/features/tareas/components/task-form';
import { deleteTask, getTask, TasksApiError, updateTask } from '@/features/tareas/services/tasks-api';
import type { Task, TaskPayload } from '@/features/tareas/types/task';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [task, setTask] = useState<Task>();
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const taskId = Number(id);
  const hasInvalidId = !Number.isInteger(taskId);

  useEffect(() => {
    if (hasInvalidId) return;
    void getTask(taskId).then(setTask).catch((cause) => setError(cause instanceof TasksApiError ? cause.message : 'No se pudo cargar la tarea.'));
  }, [hasInvalidId, taskId]);

  async function handleSubmit(payload: TaskPayload) {
    setIsSubmitting(true);
    try {
      await updateTask(Number(id), payload);
      router.replace('/tareas');
    } catch (cause) {
      Alert.alert('No se pudo actualizar la tarea', cause instanceof TasksApiError ? cause.message : 'Inténtalo de nuevo.');
    } finally { setIsSubmitting(false); }
  }

  function handleDelete() {
    if (Platform.OS === 'web') {
      if (globalThis.confirm?.('¿Eliminar esta tarea? Esta acción no se puede deshacer.')) {
        void removeTask();
      }
      return;
    }

    Alert.alert('Eliminar tarea', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          void deleteTask(Number(id)).then(() => router.replace('/tareas')).catch((cause) => {
            Alert.alert('No se pudo eliminar la tarea', cause instanceof TasksApiError ? cause.message : 'Inténtalo de nuevo.');
          });
        },
      },
    ]);
  }

  async function removeTask() {
    try {
      await deleteTask(Number(id));
      router.replace('/tareas');
    } catch (cause) {
      Alert.alert('No se pudo eliminar la tarea', cause instanceof TasksApiError ? cause.message : 'Inténtalo de nuevo.');
    }
  }

  if (hasInvalidId) return <ThemedView style={styles.center}><ThemedText style={styles.error}>El identificador de la tarea no es válido.</ThemedText><Pressable onPress={() => router.back()}><ThemedText type="linkPrimary">Volver</ThemedText></Pressable></ThemedView>;
  if (error) return <ThemedView style={styles.center}><ThemedText style={styles.error}>{error}</ThemedText><Pressable onPress={() => router.back()}><ThemedText type="linkPrimary">Volver</ThemedText></Pressable></ThemedView>;
  if (!task) return <ThemedView style={styles.center}><ActivityIndicator /><ThemedText>Cargando tarea...</ThemedText></ThemedView>;
  return <ThemedView style={styles.screen}><View style={styles.header}><Pressable onPress={() => router.back()}><ThemedText type="linkPrimary">Volver</ThemedText></Pressable><ThemedText type="subtitle">Editar tarea</ThemedText></View><TaskForm initialValues={task} submitLabel="Guardar cambios" isSubmitting={isSubmitting} onSubmit={handleSubmit} /><Pressable onPress={handleDelete} style={styles.deleteButton}><ThemedText style={styles.deleteText}>Eliminar tarea</ThemedText></Pressable></ThemedView>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, header: { padding: Spacing.four, gap: Spacing.two }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.two, padding: Spacing.four }, error: { color: '#b42318' }, deleteButton: { alignItems: 'center', padding: Spacing.three, marginHorizontal: Spacing.four, marginBottom: Spacing.four }, deleteText: { color: '#b42318', fontWeight: '700' } });