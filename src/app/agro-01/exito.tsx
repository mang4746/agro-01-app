import { router, type RelativePathString } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { RegistrationSuccess } from '@/features/agro-01/components/registration-success';
import { useAgro01Flow } from '@/features/agro-01/hooks/use-agro-01-flow';

export default function Agro01SuccessScreen() {
  const { prediction, resetFlow } = useAgro01Flow();

  function finish() {
    resetFlow();
    router.replace('/agro-01' as RelativePathString);
  }

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView className="flex-1 justify-center" edges={['top', 'bottom']}>
        <RegistrationSuccess prediction={prediction} onFinish={finish} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
