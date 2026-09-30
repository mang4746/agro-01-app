import { Link, router, type RelativePathString } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { RegistrationForm } from '@/features/agro-01/components/registration-form';
import { useAgro01Flow } from '@/features/agro-01/hooks/use-agro-01-flow';

export default function Agro01RegistrationScreen() {
  const { preregistro, setPrediction } = useAgro01Flow();

  useEffect(() => {
    if (!preregistro) {
      router.replace('/agro-01/preregistro' as RelativePathString);
    }
  }, [preregistro]);

  if (!preregistro) {
    return null;
  }

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="flex-1 gap-5 pt-4">
          <View className="flex-row items-center justify-between px-6">
            <Link href={'/agro-01/preregistro' as RelativePathString} asChild>
              <Button mode="text" icon="arrow-left" compact>
                Preregistro
              </Button>
            </Link>
            <Text variant="labelLarge" className="text-slate-500">Paso 2 de 2</Text>
          </View>
          <View className="gap-1 px-6">
            <Text variant="headlineSmall" className="font-bold text-slate-900">Registro productivo</Text>
            <Text variant="bodyMedium" className="text-slate-600">Completa los datos de la actividad agrícola.</Text>
          </View>
          <RegistrationForm
            preregistro={preregistro}
            onSuccess={(prediction) => {
              setPrediction(prediction);
              router.replace('/agro-01/exito' as RelativePathString);
            }}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
