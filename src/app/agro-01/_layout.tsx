import { Stack } from 'expo-router';

import { Agro01FlowProvider } from '@/features/agro-01/hooks/use-agro-01-flow';

export default function Agro01Layout() {
  return (
    <Agro01FlowProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </Agro01FlowProvider>
  );
}
