import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import type { Agro01Prediction } from '@/features/agro-01/types/agro-01';

type RegistrationSuccessProps = {
  prediction?: Agro01Prediction;
  onFinish: () => void;
};

function renderMarkdownInline(text: string) {
  const regex = /\*\*(.+?)\*\*|`(.+?)`|_(.+?)_/g;
  const parts: Array<{ type: 'text' | 'strong'; value: string }> = [];
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;

    if (start > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, start) });
    }

    const strongText = match[1] ?? match[3];
    const codeText = match[2];
    if (strongText) {
      parts.push({ type: 'strong', value: strongText });
    } else if (codeText) {
      parts.push({ type: 'strong', value: codeText });
    } else if (match[3]) {
      parts.push({ type: 'strong', value: match[3] });
    }

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return (
    <Text>
      {parts.map((part, index) =>
        part.type === 'strong' ? (
          <Text key={`${part.value}-${index}`} className="font-bold text-slate-900">
            {part.value}
          </Text>
        ) : (
          <Text key={`${part.value}-${index}`}>
            {part.value}
          </Text>
        )
      )}
    </Text>
  );
}

function renderMarkdownBlock(markdown: string) {
  const lines = markdown.split(/\n+/).filter((line) => line.trim().length > 0);

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (/^#{1,3}\s+/.test(trimmed)) {
      return (
        <Text key={`header-${index}`} variant="titleMedium" className="font-bold text-slate-900 mt-2">
          {trimmed.replace(/^#{1,3}\s+/, '')}
        </Text>
      );
    }

    if (/^-\s+|\*\s+/.test(trimmed)) {
      return (
        <Text key={`bullet-${index}`} className="text-slate-700 mt-1">
          {'• '}
          {renderMarkdownInline(trimmed.replace(/^[-*]\s+/, ''))}
        </Text>
      );
    }

    return (
      <Text key={`paragraph-${index}`} className="text-slate-700 mt-1">
        {renderMarkdownInline(trimmed)}
      </Text>
    );
  });
}

export function RegistrationSuccess({ prediction, onFinish }: RegistrationSuccessProps) {
  const riskColor = prediction?.riskLevel === 'alto' ? '#b91c1c' : prediction?.riskLevel === 'medio' ? '#b45309' : prediction?.riskLevel === 'bajo' ? '#15803d' : '#64748b';
  const riskCategory = prediction?.riskCategory ?? prediction?.riskLevel ?? 'Pendiente';
  const probability = prediction ? `${Math.round((prediction.probability ?? 0) * 100)}%` : 'Pendiente';
  const analysisText = prediction?.analysis || 'El análisis del agente aún no está disponible.';

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-5 px-6 pb-8" showsVerticalScrollIndicator keyboardShouldPersistTaps="handled">
      <View className="items-center gap-3">
        <MaterialCommunityIcons name="check-circle-outline" size={72} color="#15803d" />
        <Text variant="headlineSmall" className="text-center font-bold text-slate-900">
          Registro guardado
        </Text>
        <Text variant="bodyLarge" className="text-center text-slate-600">
          La información fue enviada correctamente para su evaluación.
        </Text>
      </View>

      <Card mode="contained" className="border border-slate-200 bg-white">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-slate-900">Scoring predictivo</Text>
          <Text variant="bodyLarge" style={{ color: riskColor }}>
            Riesgo: {riskCategory}
          </Text>
          <Text variant="bodyMedium" className="text-slate-600">
            Probabilidad estimada: {probability}
          </Text>
          {prediction?.probabilities && Object.keys(prediction.probabilities).length > 0 ? (
            <View className="mt-2 gap-1">
              {Object.entries(prediction.probabilities).map(([label, value]) => (
                <Text key={label} className="text-slate-600">
                  {label}: {(value * 100).toFixed(2)}%
                </Text>
              ))}
            </View>
          ) : null}
        </Card.Content>
      </Card>

      <Card mode="contained" className="border border-emerald-100 bg-emerald-50">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-emerald-950">Análisis generado</Text>
          <View>{renderMarkdownBlock(analysisText)}</View>
        </Card.Content>
      </Card>

      {prediction?.modeloVersion ? (
        <Text variant="bodySmall" className="text-slate-500">
          Modelo: {prediction.modeloVersion}
        </Text>
      ) : null}

      <Button mode="contained" icon="home-outline" onPress={onFinish}>
        Volver a AGRO 01
      </Button>
    </ScrollView>
  );
}
