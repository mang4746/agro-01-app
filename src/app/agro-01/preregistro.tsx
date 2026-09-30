import { Link, router, type RelativePathString } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { PreRegistrationForm } from '@/features/agro-01/components/pre-registration-form';
import { useAgro01Flow } from '@/features/agro-01/hooks/use-agro-01-flow';
import type { PreRegistrationValues } from '@/features/agro-01/types/agro-01';

export default function Agro01PreRegistrationScreen() {
  const { preregistro, setPreregistro } = useAgro01Flow();

  function handleSuccess(values: PreRegistrationValues) {
    setPreregistro(values);
    router.push('/agro-01/registro' as RelativePathString);
  }

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="flex-1 gap-5 pt-4">
          <View className="flex-row items-center justify-between px-6">
            <Link href="/agro-01" asChild>
              <Button mode="text" icon="arrow-left" compact>
                AGRO 01
              </Button>
            </Link>
            <Text variant="labelLarge" className="text-slate-500">Paso 1 de 2</Text>
          </View>
          <View className="gap-1 px-6">
            <Text variant="headlineSmall" className="font-bold text-slate-900">Preregistro</Text>
            <Text variant="bodyMedium" className="text-slate-600">Datos personales del solicitante.</Text>
          </View>
          <PreRegistrationForm initialValues={preregistro} onSuccess={handleSuccess} />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
