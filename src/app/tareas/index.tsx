import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { TaskCard } from '@/features/tareas/components/task-card';
import { useTasks } from '@/features/tareas/hooks/use-tasks';
import { useTheme } from '@/hooks/use-theme';

export default function TasksScreen() {
  const theme = useTheme();
  const { tasks, pagination, isLoading, isDeleting, error, loadTasks } = useTasks();
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function refresh() {
    setIsRefreshing(true);
    await loadTasks(pagination?.current_page ?? 1);
    setIsRefreshing(false);
  }

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <ThemedText type="small" themeColor="textSecondary">ORGANIZACIÓN PERSONAL</ThemedText>
            <ThemedText type="subtitle">Mis tareas</ThemedText>
          </View>
          <Link href="/tareas/crear" asChild>
            <Pressable style={({ pressed }) => [styles.addButton, pressed && styles.pressed]} accessibilityLabel="Crear tarea">
              <ThemedText style={styles.addButtonText}>+</ThemedText>
            </Pressable>
          </Link>
        </View>

        {error ? <ErrorMessage message={error} onRetry={() => void loadTasks()} /> : null}
        {isLoading && tasks.length === 0 ? (
          <View style={styles.loading}><ActivityIndicator size="large" color={theme.text} /><ThemedText>Cargando tareas...</ThemedText></View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <TaskCard task={item} onPress={() => router.push(`/tareas/${item.id}`)} />}
            contentContainerStyle={tasks.length ? styles.list : styles.emptyList}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void refresh()} tintColor={theme.text} />}
            ListEmptyComponent={<EmptyState onCreate={() => router.push('/tareas/crear')} />}
            ListFooterComponent={pagination && pagination.last_page > 1 ? (
              <Pagination current={pagination.current_page} last={pagination.last_page} onChange={(page) => void loadTasks(page)} />
            ) : null}
          />
        )}
        {isDeleting && <ActivityIndicator style={styles.deleting} color={theme.text} />}
      </SafeAreaView>
    </ThemedView>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return <View style={styles.empty}><ThemedText type="subtitle">Todo despejado</ThemedText><ThemedText themeColor="textSecondary">Aún no tienes tareas registradas.</ThemedText><Pressable onPress={onCreate} style={styles.emptyButton}><ThemedText style={styles.emptyButtonText}>Crear la primera tarea</ThemedText></Pressable></View>;
}

function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <View style={styles.errorBox}><ThemedText style={styles.errorText}>{message}</ThemedText><Pressable onPress={onRetry}><ThemedText type="linkPrimary">Reintentar</ThemedText></Pressable></View>;
}

function Pagination({ current, last, onChange }: { current: number; last: number; onChange: (page: number) => void }) {
  return <View style={styles.pagination}><Pressable disabled={current === 1} onPress={() => onChange(current - 1)}><ThemedText type="linkPrimary">Anterior</ThemedText></Pressable><ThemedText type="small">Página {current} de {last}</ThemedText><Pressable disabled={current === last} onPress={() => onChange(current + 1)}><ThemedText type="linkPrimary">Siguiente</ThemedText></Pressable></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: Spacing.four },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.four },
  addButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#20242d', alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#1e77aa', fontSize: 30, lineHeight: 32, fontWeight: '300' },
  pressed: { opacity: 0.7 },
  list: { paddingBottom: Spacing.six },
  emptyList: { flexGrow: 1, justifyContent: 'center' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.two },
  empty: { alignItems: 'center', gap: Spacing.two },
  emptyButton: { backgroundColor: '#20242d', borderRadius: Spacing.two, paddingHorizontal: Spacing.three, paddingVertical: Spacing.two, marginTop: Spacing.two },
  emptyButtonText: { color: '#ffffff', fontWeight: '700' },
  errorBox: { borderWidth: 1, borderColor: '#f1aeb5', borderRadius: Spacing.two, padding: Spacing.three, gap: Spacing.one, marginBottom: Spacing.three },
  errorText: { color: '#b42318' },
  pagination: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.four },
  deleting: { position: 'absolute', right: Spacing.two, bottom: Spacing.two },
});