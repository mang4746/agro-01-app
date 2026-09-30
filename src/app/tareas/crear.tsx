import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TaskForm } from '@/features/tareas/components/task-form';
import { createTask, TasksApiError } from '@/features/tareas/services/tasks-api';
import type { TaskPayload } from '@/features/tareas/types/task';

export default function CreateTaskScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(payload: TaskPayload) {
    setIsSubmitting(true);
    try {
      await createTask(payload);
      router.replace('/tareas');
    } catch (cause) {
      Alert.alert('No se pudo crear la tarea', cause instanceof TasksApiError ? cause.message : 'Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <ThemedView style={styles.screen}><ThemedText type="subtitle" style={styles.title}>Nueva tarea</ThemedText><TaskForm submitLabel="Crear tarea" isSubmitting={isSubmitting} onSubmit={handleSubmit} /></ThemedView>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, title: { paddingHorizontal: 24, paddingTop: 24 } });