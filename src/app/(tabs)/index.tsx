import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, type RelativePathString } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

export default function HomeTab() {
  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="flex-1 justify-between px-6 py-8">
          <View className="gap-6">
            <View className="flex-row items-center justify-between">
              <Chip icon="sprout" compact>
                APP 0.1
              </Chip>
              <MaterialCommunityIcons name="leaf-circle-outline" size={38} color="#15803d" />
            </View>

            <View className="gap-3">
              <Text variant="displaySmall" className="font-bold text-center text-slate-900">
                Bienvenido
                {/* Evalúa y crece con confianza */}
              </Text>
              <Text variant="bodyLarge" className="max-w-xl leading-7 text-slate-600">
                Completa una evaluación inteligente para acceder a un microcrédito productivo diseñado para tu actividad agrícola.
              </Text>
            </View>

            <Card mode="contained" className="border border-emerald-100 bg-emerald-50">
              <Card.Content className="gap-3">
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons name="brain" size={24} color="#047857" />
                  <Text variant="titleMedium" className="font-bold text-emerald-950">
                    Una evaluación pensada para el campo
                  </Text>
                </View>
                <Text variant="bodyMedium" className="text-emerald-800">
                  Tus respuestas nos ayudan a conocer tu producción y ofrecerte recomendaciones más acertadas.
                </Text>
              </Card.Content>
            </Card>
          </View>

          <View className="gap-3">
            <Link href={'/agro-01' as RelativePathString} asChild>
              <Button mode="contained" icon="arrow-right" contentStyle={styles.buttonContent}>
                Iniciar evaluación
              </Button>
            </Link>
            <Link href="/tareas" asChild>
              <Button mode="text" icon="clipboard-text-outline">
                Abrir mis tareas
              </Button>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  buttonContent: { height: 52 },
});