import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { FormInputField } from '@/components/form/form-input-field';
import { FormSelectField } from '@/components/form/form-select-field';
import { submitAgro01 } from '@/features/agro-01/services/agro-01-api';
import { GUARANTEE_OPTIONS, type Agro01Prediction, type PreRegistrationValues, type RegistrationValues } from '@/features/agro-01/types/agro-01';

type RegistrationFormProps = {
  preregistro: PreRegistrationValues;
  onSuccess: (prediction: Agro01Prediction) => void;
};

export function RegistrationForm({ preregistro, onSuccess }: RegistrationFormProps) {
  const { width } = useWindowDimensions();
  const fieldWidth = width >= 700 ? '48%' : '100%';
  const [requestError, setRequestError] = useState<string>();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<RegistrationValues>({
    defaultValues: {
      mtoSolicitadoKi: '',
      mtoSolicitadoKo: '',
      gastosOperativos: '',
      gastosFamiliares: '',
      mtoPatrimonio: '',
      mtoPatrimonioUfamiliar: '',
      mtoPatrimonioTotal: '',
      totalCostos: '',
      totalVentas: '',
      mtoOtorgado: '',
      plazo: '',
      codTipoGarantia: '',
    },
  });

  async function submit(values: RegistrationValues) {
    setRequestError(undefined);

    const payload = {
      ...preregistro,
      ...values,
      grupoCaedecActividad: preregistro.grupoCaedecActividad || 'AGRICULTURA Y GANADERIA',
      numCaedecActividad: preregistro.numCaedecActividad || '01126',
      experienciaActividad: Number(preregistro.experienciaActividad || 0),
      edadCliente: Number(preregistro.edadCliente || 0),
      numDependientes: Number(preregistro.numDependientes || 0),
      mtoSolicitadoKi: Number(values.mtoSolicitadoKi || 0),
      mtoSolicitadoKo: Number(values.mtoSolicitadoKo || 0),
      gastosOperativos: 0,
      gastosFamiliares: 0,
      mtoPatrimonio: Number(values.mtoPatrimonio || 0),
      mtoPatrimonioUfamiliar: 0,
      mtoPatrimonioTotal: Number(values.mtoPatrimonioTotal || 0),
      totalCostos: Number(values.totalCostos || 0),
      totalVentas: Number(values.totalVentas || 0),
      mtoOtorgado: Number(values.mtoOtorgado || 0),
      plazo: Number(values.plazo || 0),
      codTipoGarantia: String(values.codTipoGarantia || '').trim().toUpperCase(),
    };

    const response = await submitAgro01(payload);
    if (!response.success) {
      setRequestError(response.message);
      return;
    }

    onSuccess(response.data);
  }

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-4 px-6 pb-8" keyboardShouldPersistTaps="handled">
      <Card mode="contained" className="border border-emerald-100 bg-emerald-50">
        <Card.Content className="gap-1">
          <Text variant="labelLarge" className="text-emerald-800">Preregistro validado</Text>
          <Text variant="bodyMedium" className="text-emerald-950">
            {preregistro.nombreCliente} {preregistro.primerApCliente}
          </Text>
        </Card.Content>
      </Card>

      <Card mode="contained" className="border border-slate-200 bg-slate-50">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-slate-900">Monto y plazo</Text>
          <View className="flex-row flex-wrap gap-3">
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="mtoSolicitadoKi" label="Monto solicitado KI" placeholder="Ej. 57300" icon={<MaterialCommunityIcons name="cash-multiple" size={20} />} keyboardType="numeric" rules={{ required: 'El monto solicitado es obligatorio.', validate: (value) => Number(value) > 0 || 'El monto debe ser mayor a cero.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="mtoSolicitadoKo" label="Monto solicitado KO" placeholder="Ej. 25200" icon={<MaterialCommunityIcons name="cash-fast" size={20} />} keyboardType="numeric" rules={{ required: 'El monto solicitado KO es obligatorio.', validate: (value) => Number(value) >= 0 || 'El monto no puede ser negativo.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="mtoOtorgado" label="Monto otorgado" placeholder="Ej. 70000" icon={<MaterialCommunityIcons name="bank-outline" size={20} />} keyboardType="numeric" rules={{ required: 'El monto otorgado es obligatorio.', validate: (value) => Number(value) > 0 || 'El monto debe ser mayor a cero.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="plazo" label="Plazo (meses)" placeholder="Ej. 60" icon={<MaterialCommunityIcons name="calendar-month-outline" size={20} />} keyboardType="numeric" rules={{ required: 'El plazo es obligatorio.', validate: (value) => Number(value) > 0 || 'El plazo debe ser mayor a cero.' }} />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card mode="contained" className="border border-amber-100 bg-amber-50">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-amber-900">Patrimonio</Text>
          <View className="flex-row flex-wrap gap-3">
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="mtoPatrimonio" label="Patrimonio" placeholder="Ej. 135222.59" icon={<MaterialCommunityIcons name="cash-lock-open" size={20} />} keyboardType="numeric" rules={{ required: 'El patrimonio es obligatorio.', validate: (value) => Number(value) >= 0 || 'El patrimonio no puede ser negativo.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="mtoPatrimonioTotal" label="Patrimonio total" placeholder="Ej. 704547.2" icon={<MaterialCommunityIcons name="cash" size={20} />} keyboardType="numeric" rules={{ required: 'El patrimonio total es obligatorio.', validate: (value) => Number(value) >= 0 || 'El patrimonio total no puede ser negativo.' }} />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card mode="contained" className="border border-amber-100 bg-amber-50">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-amber-900">Costos y ventas</Text>
          <View className="flex-row flex-wrap gap-3">
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="totalCostos" label="Total de costos" placeholder="Ej. 61471" icon={<MaterialCommunityIcons name="receipt-outline" size={20} />} keyboardType="numeric" rules={{ required: 'El total de costos es obligatorio.', validate: (value) => Number(value) >= 0 || 'El total de costos no puede ser negativo.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="totalVentas" label="Total de ventas" placeholder="Ej. 138610" icon={<MaterialCommunityIcons name="chart-line" size={20} />} keyboardType="numeric" rules={{ required: 'El total de ventas es obligatorio.', validate: (value) => Number(value) >= 0 || 'El total de ventas no puede ser negativo.' }} />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card mode="contained" className="border border-emerald-100 bg-emerald-50">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-emerald-900">Garantía</Text>
          <View className="flex-row flex-wrap gap-3">
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="codTipoGarantia" label="Tipo de garantía" options={GUARANTEE_OPTIONS} icon={<MaterialCommunityIcons name="shield-check-outline" size={20} />} rules={{ required: 'Selecciona el tipo de garantía.' }} />
            </View>
          </View>
        </Card.Content>
      </Card>

      {requestError ? <Text className="text-red-700">{requestError}</Text> : null}

      <Button mode="contained" icon="content-save-outline" loading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(submit)}>
        Guardar registro
      </Button>
    </ScrollView>
  );
}
