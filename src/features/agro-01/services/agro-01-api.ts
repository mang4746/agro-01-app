import type {
    Agro01ApiResult,
    Agro01Prediction,
    PreRegistrationValues,
    RegistrationValues,
} from '@/features/agro-01/types/agro-01';
import { api } from '@/lib/api';

const PREREGISTRATION_ENDPOINT = '/agro-01/preregistro';
const REGISTRATION_ENDPOINT = '/agro-01/registro';

function toNumber(value: string | number | undefined, fallback = 0) {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toDateString(date?: Date | string) {
  const source = date ? new Date(date) : new Date();
  if (Number.isNaN(source.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return source.toISOString().slice(0, 10);
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string; error?: string } } }).response;
    const message = response?.data?.message ?? response?.data?.error;
    if (message) {
      return String(message);
    }
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: string }).message;
    if (message) {
      return message;
    }
  }

  return fallback;
}

function normalizePrediction(raw: Partial<Agro01Prediction> & {
  riesgo_categoria?: string;
  probabilidades?: Record<string, number>;
  analisis_agente?: string;
  analysis?: string;
  modelo_version?: string;
}): Agro01Prediction {
  const probabilities = raw.probabilidades ?? {};
  const probabilityKeys = Object.keys(probabilities);
  const topProbability = probabilityKeys.length > 0
    ? probabilityKeys.reduce((best, key) => probabilities[key] > probabilities[best] ? key : best, probabilityKeys[0])
    : undefined;

  const computedProbability = typeof raw.probability === 'number'
    ? raw.probability
    : topProbability && probabilities[topProbability] !== undefined
      ? Number(probabilities[topProbability])
      : 0;

  const riskCategory = raw.riesgo_categoria ?? raw.riskCategory ?? raw.riskLevel ?? 'No disponible';
  const normalizedRisk = String(riskCategory).toLowerCase();
  const riskLevel = normalizedRisk.includes('alto') ? 'alto' : normalizedRisk.includes('medio') ? 'medio' : normalizedRisk.includes('bajo') ? 'bajo' : String(riskCategory);

  return {
    riskLevel,
    riskCategory: String(riskCategory),
    probability: Number(computedProbability) || 0,
    analysis: raw.analisis_agente ?? raw.analysis ?? 'La respuesta del backend no incluyó un análisis textual.',
    probabilities,
    modeloVersion: raw.modelo_version,
  };
}

export async function validatePreRegistration(values: PreRegistrationValues) {
  try {
    const payload = {
      ...values,
      experienciaActividad: toNumber(values.experienciaActividad),
      edadCliente: toNumber(values.edadCliente),
      numDependientes: toNumber(values.numDependientes),
      fechaSolicitud: toDateString(values.fechaSolicitud || new Date()),
    };

    const response = await api.post<{ success: boolean; message?: string; data?: unknown }>(
      PREREGISTRATION_ENDPOINT,
      payload,
    );

    return {
      success: response.data?.success ?? true,
      message: response.data?.message ?? 'Preregistro validado correctamente.',
      data: response.data?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error, 'No se pudo validar el preregistro. Intenta nuevamente.'),
    };
  }
}

export async function submitAgro01(payload: PreRegistrationValues & RegistrationValues): Promise<Agro01ApiResult> {
  try {
    const response = await api.post<{
      success: boolean;
      message?: string;
      data?: {
        prediccion?: {
          riesgo_categoria?: string;
          probabilidades?: Record<string, number>;
          analisis_agente?: string;
          analysis?: string;
          modelo_version?: string;
        };
      };
    }>(REGISTRATION_ENDPOINT, {
      ...payload,
      experienciaActividad: toNumber(payload.experienciaActividad),
      edadCliente: toNumber(payload.edadCliente),
      numDependientes: toNumber(payload.numDependientes),
      mtoSolicitadoKi: toNumber(payload.mtoSolicitadoKi),
      mtoSolicitadoKo: toNumber(payload.mtoSolicitadoKo),
      gastosOperativos: toNumber(payload.gastosOperativos),
      gastosFamiliares: toNumber(payload.gastosFamiliares),
      mtoPatrimonio: toNumber(payload.mtoPatrimonio),
      mtoPatrimonioUfamiliar: toNumber(payload.mtoPatrimonioUfamiliar),
      mtoPatrimonioTotal: toNumber(payload.mtoPatrimonioTotal),
      totalCostos: toNumber(payload.totalCostos),
      totalVentas: toNumber(payload.totalVentas),
      mtoOtorgado: toNumber(payload.mtoOtorgado),
      plazo: toNumber(payload.plazo),
      fechaSolicitud: toDateString(payload.fechaSolicitud || new Date()),
      codTipoGarantia: String(payload.codTipoGarantia ?? '').trim().toUpperCase(),
    });

    const backendData = response.data?.data?.prediccion ?? {};
    const prediction = normalizePrediction(backendData as Partial<Agro01Prediction> & {
      riesgo_categoria?: string;
      probabilidades?: Record<string, number>;
      analisis_agente?: string;
      analysis?: string;
      modelo_version?: string;
    });

    return {
      success: response.data?.success ?? true,
      message: response.data?.message ?? 'Registro guardado correctamente.',
      data: prediction,
    };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error, 'No se pudo guardar el registro. Intenta nuevamente.'),
      data: {
        riskLevel: 'pendiente',
        probability: 0,
        analysis: 'La solicitud no pudo completarse. Revisa la conexión o intenta nuevamente.',
      },
    };
  }
}

export type { Agro01Prediction };

