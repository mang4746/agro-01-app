import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, type RelativePathString } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

export default function Agro01Screen() {
  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="flex-1 gap-8 px-6 py-6">
          <Link href="/" asChild>
            <Button mode="text" icon="arrow-left" contentStyle={styles.backButton}>
              Volver al inicio
            </Button>
          </Link>

          <View className="flex-1 justify-center gap-6">
            <View className="items-center gap-4">
              <Image
                source={require('../../assets/logo.png')}
                resizeMode="contain"
                accessibilityLabel="Logotipo de Dev Null"
                style={styles.logo}
              />
              <Text variant="headlineMedium" className="text-center font-bold text-slate-900">
                Formulario AGRO 01
              </Text>
              <Text variant="bodyLarge" className="text-center leading-7 text-slate-600">
                Evaluación inteligente de microcréditos productivos.
              </Text>
            </View>

            <Card mode="contained" className="border border-emerald-100 bg-emerald-50">
              <Card.Content className="flex-row items-center gap-3">
                <MaterialCommunityIcons name="information-outline" size={24} color="#047857" />
                <Text variant="bodyMedium" className="flex-1 text-emerald-900">
                  Aquí comenzará el registro de la información productiva.
                </Text>
              </Card.Content>
            </Card>
            <Link href={'/agro-01/preregistro' as RelativePathString} asChild>
              <Button mode="contained" icon="arrow-right">
                Iniciar preregistro
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
  logo: { width: 260, height: 260 },
  backButton: { alignSelf: 'flex-start' },
});