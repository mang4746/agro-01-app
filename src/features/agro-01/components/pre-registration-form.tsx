import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { FormInputField } from '@/components/form/form-input-field';
import { FormSelectField } from '@/components/form/form-select-field';
import { validatePreRegistration } from '@/features/agro-01/services/agro-01-api';
import {
  ACTIVITY_OPTIONS,
  AREA_OPTIONS,
  CAEDEC_ACTIVITY_GROUP_OPTIONS,
  CAEDEC_ACTIVITY_OPTIONS,
  CIVIL_STATUS_OPTIONS,
  DEPARTAMENTO_OPTIONS,
  EDUCATION_OPTIONS,
  HOUSING_OPTIONS,
  LOCALIDAD_OPTIONS,
  MUNICIPIO_OPTIONS,
  PROFESSION_OPTIONS,
  RUBRO_OPTIONS,
  SECTOR_OPTIONS,
  type PreRegistrationValues,
} from '@/features/agro-01/types/agro-01';

type PreRegistrationFormProps = {
  initialValues?: Partial<PreRegistrationValues>;
  onSuccess: (values: PreRegistrationValues) => void;
};

const getDefaultValues = (initialValues?: Partial<PreRegistrationValues>): PreRegistrationValues => ({
  nombreCliente: initialValues?.nombreCliente ?? '',
  primerApCliente: initialValues?.primerApCliente ?? '',
  segundoApCliente: initialValues?.segundoApCliente ?? '',
  actividad: initialValues?.actividad ?? '',
  experienciaActividad: initialValues?.experienciaActividad ?? '',
  estadoCivil: initialValues?.estadoCivil ?? '',
  deptoCliente: initialValues?.deptoCliente ?? '',
  municipioCliente: initialValues?.municipioCliente ?? '',
  localidadCliente: initialValues?.localidadCliente ?? '',
  fechaSolicitud: initialValues?.fechaSolicitud ?? new Date().toISOString().slice(0, 10),
  edadCliente: initialValues?.edadCliente ?? '',
  numDependientes: initialValues?.numDependientes ?? '',
  nivelEducacion: initialValues?.nivelEducacion ?? '',
  tipoVivienda: initialValues?.tipoVivienda ?? '',
  profesion: initialValues?.profesion ?? '',
  sector: initialValues?.sector ?? '',
  areaCliente: initialValues?.areaCliente ?? '',
  rubro: initialValues?.rubro ?? '',
  grupoCaedecActividad: initialValues?.grupoCaedecActividad ?? 'AGRICULTURA Y GANADERIA',
  codGrupoCaedecAct: initialValues?.codGrupoCaedecAct ?? '',
  caedecActividad: initialValues?.caedecActividad ?? '',
  numCaedecActividad: initialValues?.numCaedecActividad ?? '01126',
});

export function PreRegistrationForm({ initialValues, onSuccess }: PreRegistrationFormProps) {
  const { width } = useWindowDimensions();
  const fieldWidth = width >= 700 ? '48%' : '100%';
  const [requestError, setRequestError] = useState<string>();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<PreRegistrationValues>({
    defaultValues: getDefaultValues(initialValues),
  });

  async function submit(values: PreRegistrationValues) {
    setRequestError(undefined);

    const payload = {
      ...values,
      grupoCaedecActividad: values.grupoCaedecActividad || 'AGRICULTURA Y GANADERIA',
      numCaedecActividad: values.numCaedecActividad || '01126',
      fechaSolicitud: values.fechaSolicitud || new Date().toISOString().slice(0, 10),
      experienciaActividad: Number(values.experienciaActividad || 0),
      edadCliente: Number(values.edadCliente || 0),
      numDependientes: Number(values.numDependientes || 0),
    };

    const response = await validatePreRegistration(payload);
    if (!response.success) {
      setRequestError(response.message);
      return;
    }

    onSuccess(payload);
  }

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-4 px-6 pb-8" keyboardShouldPersistTaps="handled">
      <Text variant="bodyMedium" className="text-slate-600">
        Completa los datos de identificación, actividad y perfil del solicitante antes de continuar.
      </Text>

      <Card mode="contained" className="border border-slate-200 bg-slate-50">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-slate-900">Datos generales</Text>
          <View className="flex-row flex-wrap gap-3">
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="nombreCliente" label="Nombre del cliente" icon={<MaterialCommunityIcons name="account-outline" size={20} />} rules={{ required: 'El nombre es obligatorio.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="primerApCliente" label="Primer apellido" icon={<MaterialCommunityIcons name="account-outline" size={20} />} rules={{ required: 'El primer apellido es obligatorio.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="segundoApCliente" label="Segundo apellido" icon={<MaterialCommunityIcons name="account-outline" size={20} />} rules={{ required: 'El segundo apellido es obligatorio.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="edadCliente" label="Edad" placeholder="Ej. 46" icon={<MaterialCommunityIcons name="calendar-account-outline" size={20} />} keyboardType="numeric" rules={{ required: 'La edad es obligatoria.', validate: (value) => Number(value) > 0 || 'La edad debe ser mayor a cero.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="estadoCivil" label="Estado civil" options={CIVIL_STATUS_OPTIONS} icon={<MaterialCommunityIcons name="heart-outline" size={20} />} rules={{ required: 'Selecciona el estado civil.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="numDependientes" label="Número de dependientes" placeholder="Ej. 2" icon={<MaterialCommunityIcons name="account-group-outline" size={20} />} keyboardType="numeric" rules={{ required: 'Indica el número de dependientes.', validate: (value) => Number(value) >= 0 || 'El valor no puede ser negativo.' }} />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card mode="contained" className="border border-emerald-100 bg-emerald-50">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-emerald-900">Actividad y perfil productivo</Text>
          <View className="flex-row flex-wrap gap-3">
            <View style={{ width: '100%' }}>
              <FormSelectField control={control} name="actividad" label="Actividad principal" options={ACTIVITY_OPTIONS} icon={<MaterialCommunityIcons name="sprout-outline" size={20} />} rules={{ required: 'La actividad es obligatoria.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormInputField control={control} name="experienciaActividad" label="Experiencia en la actividad (años)" placeholder="Ej. 24" icon={<MaterialCommunityIcons name="briefcase-outline" size={20} />} keyboardType="numeric" rules={{ required: 'La experiencia es obligatoria.', validate: (value) => Number(value) >= 0 || 'La experiencia no puede ser negativa.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="profesion" label="Profesión" options={PROFESSION_OPTIONS} icon={<MaterialCommunityIcons name="school-outline" size={20} />} rules={{ required: 'La profesión es obligatoria.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="sector" label="Sector" options={SECTOR_OPTIONS} icon={<MaterialCommunityIcons name="factory" size={20} />} rules={{ required: 'Selecciona el sector.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="rubro" label="Rubro" options={RUBRO_OPTIONS} icon={<MaterialCommunityIcons name="package-variant-closed" size={20} />} rules={{ required: 'El rubro es obligatorio.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="codGrupoCaedecAct" label="Código grupo CAEDEC" options={CAEDEC_ACTIVITY_GROUP_OPTIONS} icon={<MaterialCommunityIcons name="identifier" size={20} />} rules={{ required: 'Selecciona el código del grupo.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="caedecActividad" label="CAEDEC actividad" options={CAEDEC_ACTIVITY_OPTIONS} icon={<MaterialCommunityIcons name="file-document-outline" size={20} />} rules={{ required: 'La actividad CAEDEC es obligatoria.' }} />
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card mode="contained" className="border border-amber-100 bg-amber-50">
        <Card.Content className="gap-2">
          <Text variant="titleMedium" className="font-bold text-amber-900">Ubicación y situación socioeconómica</Text>
          <View className="flex-row flex-wrap gap-3">
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="deptoCliente" label="Departamento" options={DEPARTAMENTO_OPTIONS} icon={<MaterialCommunityIcons name="map-marker-outline" size={20} />} rules={{ required: 'El departamento es obligatorio.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="municipioCliente" label="Municipio" options={MUNICIPIO_OPTIONS} icon={<MaterialCommunityIcons name="map-marker-radius-outline" size={20} />} rules={{ required: 'El municipio es obligatorio.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="localidadCliente" label="Localidad" options={LOCALIDAD_OPTIONS} icon={<MaterialCommunityIcons name="map-outline" size={20} />} rules={{ required: 'La localidad es obligatoria.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="areaCliente" label="Área" options={AREA_OPTIONS} icon={<MaterialCommunityIcons name="city-variant-outline" size={20} />} rules={{ required: 'Selecciona el área.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="nivelEducacion" label="Nivel de educación" options={EDUCATION_OPTIONS} icon={<MaterialCommunityIcons name="school-outline" size={20} />} rules={{ required: 'Selecciona el nivel de educación.' }} />
            </View>
            <View style={{ width: fieldWidth }}>
              <FormSelectField control={control} name="tipoVivienda" label="Tipo de vivienda" options={HOUSING_OPTIONS} icon={<MaterialCommunityIcons name="home-outline" size={20} />} rules={{ required: 'Selecciona el tipo de vivienda.' }} />
            </View>
          </View>
        </Card.Content>
      </Card>

      {requestError ? <Text className="text-red-700">{requestError}</Text> : null}

      <Button mode="contained" icon="arrow-right" loading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(submit)}>
        Siguiente
      </Button>
    </ScrollView>
  );
}
