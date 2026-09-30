export type PreRegistrationValues = {
  nombreCliente: string;
  primerApCliente: string;
  segundoApCliente: string;
  actividad: string;
  experienciaActividad: string | number;
  estadoCivil: string;
  deptoCliente: string;
  municipioCliente: string;
  localidadCliente: string;
  fechaSolicitud: string;
  edadCliente: string | number;
  numDependientes: string | number;
  nivelEducacion: string;
  tipoVivienda: string;
  profesion: string;
  sector: string;
  areaCliente: string;
  rubro: string;
  grupoCaedecActividad: string;
  codGrupoCaedecAct: string;
  caedecActividad: string;
  numCaedecActividad: string;
};

export type RegistrationValues = {
  mtoSolicitadoKi: string | number;
  mtoSolicitadoKo: string | number;
  gastosOperativos: string | number;
  gastosFamiliares: string | number;
  mtoPatrimonio: string | number;
  mtoPatrimonioUfamiliar: string | number;
  mtoPatrimonioTotal: string | number;
  totalCostos: string | number;
  totalVentas: string | number;
  mtoOtorgado: string | number;
  plazo: string | number;
  codTipoGarantia: string;
};

export type Agro01Submission = {
  preregistro: PreRegistrationValues;
  registro: RegistrationValues;
};

export type Agro01Prediction = {
  riskLevel: 'bajo' | 'medio' | 'alto' | string;
  riskCategory?: string;
  probability: number;
  analysis: string;
  probabilities?: Record<string, number>;
  modeloVersion?: string;
};

export type Agro01ApiResult = {
  success: boolean;
  message: string;
  data: Agro01Prediction;
};

export const ACTIVITY_OPTIONS = [
  { value: 'CULTIVO DE CEREALES', label: 'Cultivo de cereales' },
  { value: 'CULTIVOS DE PRODUCTOS AGRÍCOLAS EN COMBINACIÓN CON LA CRÍA DE ANIMALES (EXPLOTACIÓN MIXTA)', label: 'Cultivos de productos agrícolas en combinación con la cría de animales (explotación mixta)' },
  { value: '74219 OTROS SERVICIOS DE ACTIVIDADES TÉCNICAS', label: '74219 Otros servicios de actividades técnicas' },
  { value: 'FABRICACIÓN DE CALZADO DE CUERO, EXCEPTO ORTOPÉDICO Y DE ASBESTO', label: 'Fabricación de calzado de cuero, excepto ortopédico y de asbesto' },
  { value: '51431 VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN', label: '51431 Venta al por mayor de materiales de construcción' },
  { value: '01126 CULTIVO DE FLORES Y PLANTAS ORNAMENTALES', label: '01126 Cultivo de flores y plantas ornamentales' },
  { value: 'EXTRACCIÓN DE ARENAS', label: 'Extracción de arenas' },
  { value: '52202 VENTA AL POR MENOR DE PRODUCTOS LÁCTEOS', label: '52202 Venta al por menor de productos lácteos' },
  { value: 'VENTA AL POR MENOR DE ARTÍCULOS DE FERRETERÍA, FONTANERÍA Y CALEFACCIÓN', label: 'Venta al por menor de artículos de ferretería, fontanería y calefacción' },
  { value: 'CULTIVO FORRAJERO (PARA EL PASTOREO O LA HENIFICACIÓN, FORRAJE VERDE O ENSILAJE)', label: 'Cultivo forrajero (para el pastoreo o la henificación, forraje verde o ensilaje)' },
  { value: 'FABRICACIÓN DE MUEBLES, EXCEPTO LOS QUE SON PRINCIPALMENTE DE MADERA Y METÁLICOS', label: 'Fabricación de muebles, excepto los que son principalmente de madera y metálicos' },
  { value: 'OTROS CULTIVOS DE HORTALIZAS, LEGUMBRES Y ESPECIALIDADES HORTÍCOLAS Y RECOLECCIONES NCP', label: 'Otros cultivos de hortalizas, legumbres y especialidades hortícolas y recolecciones NCP' },
  { value: 'MATANZA DE GANADO BOVINO Y PROCESAMIENTO DE SU CARNE', label: 'Matanza de ganado bovino y procesamiento de su carne' },
  { value: 'VENTA AL POR MENOR DE FLORES', label: 'Venta al por menor de flores' },
  { value: 'VENTA AL POR MAYOR DE ANIMALES VIVOS', label: 'Venta al por mayor de animales vivos' },
  { value: '51433 VENTA AL POR MAYOR DE ARTÍCULOS DE FERRETERÍA, FONTANERÍA Y CALEFACCIÓN', label: '51433 Venta al por mayor de artículos de ferretería, fontanería y calefacción' },
  { value: 'FABRICACIÓN DE PRODUCTOS DE ARCILLA Y CERÁMICA NO REFRACTARIAS PARA USO ESTRUCTURAL', label: 'Fabricación de productos de arcilla y cerámica no refractarias para uso estructural' },
  { value: 'SERVICIO DE TRANSPORTE AUTOMOTOR URBANO DE PASAJEROS', label: 'Servicio de transporte automotor urbano de pasajeros' },
  { value: '36101 FABRICACIÓN DE MUEBLES Y PARTES DE MUEBLES, PRINCIPALMENTE DE MADERA', label: '36101 Fabricación de muebles y partes de muebles, principalmente de madera' },
  { value: 'FABRICACIÓN DE TEJIDOS Y ARTÍCULOS DE PUNTO NCP', label: 'Fabricación de tejidos y artículos de punto NCP' },
  { value: '01127 PRODUCCIÓN DE SEMILLAS Y OTRAS FORMAS DE PROPAGACIÓN DE CULTIVOS AGRÍCOLAS', label: '01127 Producción de semillas y otras formas de propagación de cultivos agrícolas' },
  { value: '17120 ACABADO DE PRODUCTOS TEXTILES', label: '17120 Acabado de productos textiles' },
  { value: '74212 SERVICIOS DE INGENIERÍA', label: '74212 Servicios de ingeniería' },
  { value: '52323 VENTA AL POR MENOR DE PRENDAS Y ACCESORIOS DE VESTIR', label: '52323 Venta al por menor de prendas y accesorios de vestir' },
  { value: 'VENTA AL POR MENOR EN PUESTOS DE VENTA Y MERCADOS', label: 'Venta al por menor en puestos de venta y mercados' },
  { value: '22220 ACTIVIDADES DE SERVICIOS RELACIONADAS CON LA IMPRESIÓN', label: '22220 Actividades de servicios relacionadas con la impresión' },
  { value: 'VENTA AL POR MAYOR DE BEBIDAS, CIGARRILLOS Y TABACO', label: 'Venta al por mayor de bebidas, cigarrillos y tabaco' },
  { value: 'VENTA AL POR MAYOR DE ARTÍCULOS ARTESANALES', label: 'Venta al por mayor de artículos artesanales' },
  { value: 'VENTA AL POR MENOR DE ARTEFACTOS PARA EL HOGAR, ELÉCTRICOS, A GAS, KEROSENE U OTROS COMBUSTIBLES', label: 'Venta al por menor de artefactos para el hogar, eléctricos, a gas, kerosene u otros combustibles' },
  { value: '52206 VENTA AL POR MENOR DE CAFÉ, TÉ, CACAO Y ESPECIAS', label: '52206 Venta al por menor de café, té, cacao y especias' },
];

export const CIVIL_STATUS_OPTIONS = [
  { value: 'SOLTERO(A)', label: 'Soltero(a)' },
  { value: 'SEPARADO(A)', label: 'Separado(a)' },
  { value: 'DIVORCIADO(A)', label: 'Divorciado(a)' },
  { value: 'CASADO(A)', label: 'Casado(a)' },
  { value: 'CONCUBINADO(A)', label: 'Concubinado(a)' },
  { value: 'VIUDO(A)', label: 'Viudo(a)' },
];

export const PROFESSION_OPTIONS = [
  { value: 'OTRO', label: 'Otro' },
  { value: 'INGENIERO ELECTRICO', label: 'Ingeniero eléctrico' },
  { value: 'AGRICULTOR', label: 'Agricultor' },
  { value: 'INGENIERO PETROLERO', label: 'Ingeniero petrolero' },
  { value: 'ABOGADO', label: 'Abogado' },
  { value: 'INGENIERO INDUSTRIAL', label: 'Ingeniero industrial' },
  { value: 'ANTROPÓLOGO', label: 'Antropólogo' },
  { value: 'MÉDICO', label: 'Médico' },
  { value: 'BIOQUÍMICO', label: 'Bioquímico' },
  { value: 'TOPOGRAFO GEODESTA', label: 'Topógrafo geodesta' },
  { value: 'TRABAJADORA SOCIAL', label: 'Trabajadora social' },
  { value: 'INGENIERO COMERCIAL', label: 'Ingeniero comercial' },
  { value: 'INGENIERO AMBIENTAL', label: 'Ingeniero ambiental' },
  { value: 'EMPLEADO', label: 'Empleado' },
  { value: 'MILITAR', label: 'Militar' },
  { value: 'CONTADOR', label: 'Contador' },
  { value: 'SECRETARIA', label: 'Secretaria' },
  { value: 'MÚSICO', label: 'Músico' },
  { value: 'AMA DE CASA', label: 'Ama de casa' },
  { value: 'ENFERMERA', label: 'Enfermera' },
  { value: 'PISCICULTOR', label: 'Piscicultor' },
  { value: 'MECÁNICO AUTOMOTRIZ', label: 'Mecánico automotriz' },
  { value: 'INGENIERO GEOGRÁFICO', label: 'Ingeniero geográfico' },
  { value: 'INGENIERO FINANCIERO', label: 'Ingeniero financiero' },
  { value: 'PSICÓLOGO', label: 'Psicólogo' },
  { value: 'QUÍMICO FARMACEÚTICO', label: 'Químico farmacéutico' },
  { value: 'ESTUDIANTE', label: 'Estudiante' },
  { value: 'COMERCIANTE', label: 'Comerciante' },
  { value: 'ECONOMISTA', label: 'Economista' },
  { value: 'LIC. EN CIENCIAS POLÍTICAS', label: 'Lic. en ciencias políticas' },
  { value: 'LIC. EN TURISMO', label: 'Lic. en turismo' },
  { value: 'NUTRICIONISTA', label: 'Nutricionista' },
  { value: 'VETERINARIO', label: 'Veterinario' },
  { value: 'PRODUCTOR PECUARIO', label: 'Productor pecuario' },
  { value: 'PROFESOR', label: 'Profesor' },
  { value: 'CARPINTERO', label: 'Carpintero' },
  { value: 'AUDITOR', label: 'Auditor' },
  { value: 'ELECTRICISTA', label: 'Electricista' },
  { value: 'INGENIERO DE SISTEMAS', label: 'Ingeniero de sistemas' },
  { value: 'POLICIA', label: 'Policía' },
  { value: 'FARMACEÚTICO', label: 'Farmacéutico' },
  { value: 'PERIODISTA', label: 'Periodista' },
  { value: 'INGENIERO CIVIL', label: 'Ingeniero civil' },
  { value: 'MECÁNICA INDUSTRIAL', label: 'Mecánica industrial' },
  { value: 'ADMINISTRADOR DE EMPRESAS', label: 'Administrador de empresas' },
  { value: 'PANADERO', label: 'Panadero' },
  { value: 'NA', label: 'N/A' },
];

export const DEPARTAMENTO_OPTIONS = [
  { value: 'POTOSI', label: 'Potosí' },
  { value: 'ORURO', label: 'Oruro' },
  { value: 'SANTA CRUZ', label: 'Santa Cruz' },
  { value: 'PANDO', label: 'Pando' },
  { value: 'XXX', label: 'XXX' },
  { value: 'CHUQUISACA', label: 'Chuquisaca' },
  { value: 'LA PAZ', label: 'La Paz' },
  { value: 'COCHABAMBA', label: 'Cochabamba' },
  { value: 'TARIJA', label: 'Tarija' },
  { value: 'BENI', label: 'Beni' },
];

export const MUNICIPIO_OPTIONS = [
  { value: 'LAGUNILLAS', label: 'Lagunillas' },
  { value: 'YAPACANÍ', label: 'Yapacaní' },
  { value: 'MONTERO', label: 'Montero' },
  { value: 'CAMARGO', label: 'Camargo' },
  { value: 'COMANCHE', label: 'Comanche' },
  { value: 'SICA SICA', label: 'Sica Sica' },
  { value: 'AYO AYO', label: 'Ayo Ayo' },
  { value: 'SANTA ROSA DEL SARA', label: 'Santa Rosa del Sara' },
  { value: 'SAIPINA', label: 'Saipina' },
  { value: 'ORURO', label: 'Oruro' },
  { value: 'MIZQUE', label: 'Mizque' },
  { value: 'COLOMI', label: 'Colomi' },
  { value: 'CALAMARCA', label: 'Calamarca' },
  { value: 'SAN ANDRÉS', label: 'San Andrés' },
  { value: 'SAN CARLOS', label: 'San Carlos' },
  { value: 'TAPACARÍ', label: 'Tapacarí' },
  { value: 'SHINAHOTA', label: 'Shinahota' },
  { value: 'FERNÁNDEZ ALONSO', label: 'Fernández Alonso' },
  { value: 'CUATRO CAÑADAS', label: 'Cuatro Cañadas' },
  { value: 'POCONA', label: 'Pocona' },
  { value: 'PAILÓN', label: 'Pailón' },
  { value: 'GUAQUI', label: 'Guaqui' },
  { value: 'CAQUIAVIRI', label: 'Caquiaviri' },
  { value: 'PUCARA', label: 'Pucara' },
  { value: 'RURRENABAQUE', label: 'Rurrenabaque' },
];

export const LOCALIDAD_OPTIONS = [
  { value: 'PINAYA', label: 'Pinaya' },
  { value: 'CIUDAD COCHABAMBA', label: 'Ciudad Cochabamba' },
  { value: 'COMUNIDAD PUEBLO NUEVO', label: 'Comunidad Pueblo Nuevo' },
  { value: 'CHILLCHIRI', label: 'Chillchiri' },
  { value: 'MONTERO', label: 'Montero' },
  { value: 'QUIRUCILLA', label: 'Quirucilla' },
  { value: 'CHINCHAYA', label: 'Chinchaya' },
  { value: 'SANTA ANA LA VIEJA', label: 'Santa Ana la Vieja' },
  { value: 'COMANCHE', label: 'Comanche' },
  { value: 'AMACHUMA GRANDE', label: 'Amachuma Grande' },
  { value: 'CAMARGO', label: 'Camargo' },
  { value: 'QUIRPINI GRANDE', label: 'Quirpini Grande' },
  { value: 'CONCHIRI', label: 'Conchiri' },
  { value: 'SELLA MENDEZ', label: 'Sella Mendez' },
  { value: 'TUPAC KATARI', label: 'Tupac Katari' },
  { value: '4 DE MARZO', label: '4 de Marzo' },
  { value: 'SAIPINA', label: 'Saipina' },
  { value: 'ORURO', label: 'Oruro' },
  { value: 'SANTA ROSA DEL SARA', label: 'Santa Rosa del Sara' },
  { value: 'JOROCHITO', label: 'Jorochito' },
  { value: 'AZAMBO', label: 'Azambo' },
  { value: 'PUCARA', label: 'Pucara' },
  { value: 'PALCA DATA', label: 'Palca Data' },
  { value: 'TRES CRUCES', label: 'Tres Cruces' },
  { value: 'PUNTO SUELO', label: 'Punto Suelo' },
  { value: 'KELLA KELLA', label: 'Kella Kella' },
  { value: 'CHAÑAVI', label: 'Chañavi' },
  { value: 'LAS PAVAS DISTRITO 7', label: 'Las Pavas Distrito 7' },
  { value: 'VILLA MODERNA', label: 'Villa Moderna' },
  { value: 'COLONIA MEJILLONES', label: 'Colonia Mejillones' },
  { value: 'POMPEYA', label: 'Pompeya' },
  { value: 'AGUA CLARA', label: 'Agua Clara' },
  { value: 'CARMEN DEL DORADO', label: 'Carmen del Dorado' },
  { value: 'QUIJARRO', label: 'Quijarro' },
  { value: 'ESMERALDA', label: 'Esmeralda' },
  { value: 'CHALLASIRCA', label: 'Challasirca' },
  { value: 'ANTOFAGASTA', label: 'Antofagasta' },
  { value: 'IÑACAMAYA', label: 'Iñacamaya' },
  { value: 'CHICALOMA', label: 'Chicaloma' },
  { value: 'EL CENTRO', label: 'El Centro' },
  { value: 'IPATI', label: 'Ipati' },
  { value: 'PORVENIR B', label: 'Porvenir B' },
  { value: 'VILLA RECREO', label: 'Villa Recreo' },
  { value: 'VILLA VICTORIA C', label: 'Villa Victoria C' },
  { value: 'QUILLAKAMANI', label: 'Quillakamani' },
  { value: 'PUCA PAMPA', label: 'Puca Pampa' },
  { value: 'KOARI MEDIO', label: 'Koari Medio' },
  { value: 'UCHUMACHI', label: 'Uchumachi' },
  { value: 'COLOMI', label: 'Colomi' },
  { value: 'VILLA AROMA', label: 'Villa Aroma' },
  { value: 'COLLPA CENTRO', label: 'Collpa Centro' },
  { value: 'ESPEJITOS', label: 'Espejitos' },
  { value: 'CONDOR LLIMPHI', label: 'Condor Llimphi' },
  { value: 'HUAYLLAS', label: 'Huayllas' },
  { value: 'ILLIMANI NUCLEO 29', label: 'Illimani Núcleo 29' },
];

export const EDUCATION_OPTIONS = [
  { value: 'SECUNDARIA', label: 'Secundaria' },
  { value: 'UNIVERSITARIO', label: 'Universitario' },
  { value: 'TECNICO', label: 'Técnico' },
  { value: 'PRIMARIA', label: 'Primaria' },
  { value: 'NINGUNA', label: 'Ninguna' },
];

export const HOUSING_OPTIONS = [
  { value: 'PROPIA', label: 'Propia' },
  { value: 'ALQUILER', label: 'Alquiler' },
  { value: 'CEDIDA', label: 'Cedida' },
  { value: 'HERENCIA', label: 'Herencia' },
  { value: 'OTROS', label: 'Otros' },
  { value: 'ANTICRETICO', label: 'Anticrético' },
];

export const SECTOR_OPTIONS = [
  { value: 'COMERCIALIZACION', label: 'Comercialización' },
  { value: 'PRODUCCION', label: 'Producción' },
  { value: 'SERVICIOS', label: 'Servicios' },
  { value: 'TURISMO', label: 'Turismo' },
  { value: 'TRANSFORMACION', label: 'Transformación' },
];

export const AREA_OPTIONS = [
  { value: 'RURAL', label: 'Rural' },
  { value: 'URBANO', label: 'Urbano' },
];

export const RUBRO_OPTIONS = [
  { value: 'ALIMENTOS', label: 'Alimentos' },
  { value: 'ARTESANIA', label: 'Artesanía' },
  { value: 'TEXTILES', label: 'Textiles' },
  { value: 'N/A', label: 'N/A' },
  { value: 'TURISMO', label: 'Turismo' },
  { value: 'SERVICIOS', label: 'Servicios' },
  { value: 'ORFEBRERIA', label: 'Orfebrería' },
  { value: 'MADERAS', label: 'Maderas' },
  { value: 'CUEROS', label: 'Cueros' },
  { value: 'CERAMICA', label: 'Cerámica' },
  { value: 'INDUSTRIAL', label: 'Industrial' },
  { value: 'MAT. DE CONSTRUCCION', label: 'Mat. de construcción' },
  { value: 'COMERCIO', label: 'Comercio' },
];

export const GUARANTEE_OPTIONS = [
  { value: 'NC4', label: 'NC4' },
  { value: 'P03', label: 'P03' },
  { value: 'HI1, OT3', label: 'HI1, OT3' },
  { value: 'HI1, OT6', label: 'HI1, OT6' },
  { value: 'HO1, NC3, OT3', label: 'HO1, NC3, OT3' },
  { value: 'HO1, P04', label: 'HO1, P04' },
  { value: 'IPN, P09', label: 'IPN, P09' },
  { value: 'P04', label: 'P04' },
  { value: 'HI1, OT1', label: 'HI1, OT1' },
  { value: 'NC4, P04', label: 'NC4, P04' },
  { value: 'HI1', label: 'HI1' },
  { value: 'HT1', label: 'HT1' },
  { value: 'HI1, NC8', label: 'HI1, NC8' },
  { value: 'NC3, NC8, OT3', label: 'NC3, NC8, OT3' },
  { value: 'HO1, NC3', label: 'HO1, NC3' },
  { value: 'NC8', label: 'NC8' },
  { value: 'IPN, NC8', label: 'IPN, NC8' },
  { value: 'HO1, IPN', label: 'HO1, IPN' },
  { value: 'HO1, OT3', label: 'HO1, OT3' },
  { value: 'HO1, NC8', label: 'HO1, NC8' },
  { value: 'HV1, IPN, OT6', label: 'HV1, IPN, OT6' },
  { value: 'HV1, IPN', label: 'HV1, IPN' },
  { value: 'HI1, NC3, OT3', label: 'HI1, NC3, OT3' },
  { value: 'HO1, OT6', label: 'HO1, OT6' },
  { value: 'P09', label: 'P09' },
  { value: 'HT1, P04', label: 'HT1, P04' },
  { value: 'NC8, OT6', label: 'NC8, OT6' },
  { value: 'IPN, P03', label: 'IPN, P03' },
  { value: 'HV1, OT6', label: 'HV1, OT6' },
  { value: 'HV1, P04', label: 'HV1, P04' },
  { value: 'IPN, OT1', label: 'IPN, OT1' },
  { value: 'NC3, P03', label: 'NC3, P03' },
  { value: 'HV1, OT3', label: 'HV1, OT3' },
  { value: 'IPN, NC3', label: 'IPN, NC3' },
  { value: 'L04', label: 'L04' },
  { value: 'HV1, NC3', label: 'HV1, NC3' },
  { value: 'NC3, OT3', label: 'NC3, OT3' },
  { value: 'P05', label: 'P05' },
  { value: 'HI1, NC8, OT3', label: 'HI1, NC8, OT3' },
  { value: 'NC8, P04', label: 'NC8, P04' },
  { value: 'P06', label: 'P06' },
  { value: 'HV1, P09', label: 'HV1, P09' },
  { value: 'NC8, OT3', label: 'NC8, OT3' },
  { value: 'NC5', label: 'NC5' },
  { value: 'HI1, P04', label: 'HI1, P04' },
  { value: 'HV1, OT1', label: 'HV1, OT1' },
  { value: 'NC3, OT3, P04', label: 'NC3, OT3, P04' },
  { value: 'IPN, NC4, OT6', label: 'IPN, NC4, OT6' },
  { value: 'NC3', label: 'NC3' },
  { value: 'IPN, NC4', label: 'IPN, NC4' },
  { value: 'HO1, OT1', label: 'HO1, OT1' },
  { value: 'HI1, HV1', label: 'HI1, HV1' },
  { value: 'IP0', label: 'IP0' },
  { value: 'IPN, P04', label: 'IPN, P04' },
  { value: 'HI1, NC4', label: 'HI1, NC4' },
  { value: 'HI2', label: 'HI2' },
  { value: 'NC3, NC4', label: 'NC3, NC4' },
  { value: 'IPN, L04', label: 'IPN, L04' },
  { value: 'HR1', label: 'HR1' },
  { value: 'OT3, P04', label: 'OT3, P04' },
  { value: 'NC4, OT6', label: 'NC4, OT6' },
  { value: 'OT1, PD3, P09', label: 'OT1, PD3, P09' },
  { value: 'HV1', label: 'HV1' },
  { value: 'OT1', label: 'OT1' },
  { value: 'OT6, P04', label: 'OT6, P04' },
  { value: 'IPN', label: 'IPN' },
  { value: 'IPN, OT3', label: 'IPN, OT3' },
  { value: 'NC3, OT6', label: 'NC3, OT6' },
  { value: 'HI1, NC3', label: 'HI1, NC3' },
  { value: 'NC4, OT3', label: 'NC4, OT3' },
  { value: 'HV1, NC4', label: 'HV1, NC4' },
  { value: 'HR1, IPN', label: 'HR1, IPN' },
  { value: 'HI1, P09', label: 'HI1, P09' },
  { value: 'HR1, OT3', label: 'HR1, OT3' },
  { value: 'HR1, NC3', label: 'HR1, NC3' },
  { value: 'P03, P04', label: 'P03, P04' },
  { value: 'HO1', label: 'HO1' },
  { value: 'HI1, IPN', label: 'HI1, IPN' },
  { value: 'IPN, NC3, OT3', label: 'IPN, NC3, OT3' },
  { value: 'NC4, NC8', label: 'NC4, NC8' },
  { value: 'NC3, NC8', label: 'NC3, NC8' },
  { value: 'NC3, P04', label: 'NC3, P04' },
  { value: 'IPN, OT6', label: 'IPN, OT6' },
  { value: 'HI1, HO1', label: 'HI1, HO1' },
  { value: 'NC3, OT1', label: 'NC3, OT1' },
];

export const CAEDEC_ACTIVITY_GROUP_OPTIONS = [
  { value: 'A', label: 'A' },
];

export const CAEDEC_ACTIVITY_OPTIONS = [
  { value: 'CULTIVO DE CEREALES', label: 'Cultivo de cereales' },
  { value: 'CULTIVOS DE PRODUCTOS AGRÍCOLAS EN COMBINACIÓN CON LA CRÍA DE ANIMALES (EXPLOTACIÓN MIXTA)', label: 'Cultivos de productos agrícolas en combinación con la cría de animales (explotación mixta)' },
  { value: 'CULTIVO FORRAJERO (PARA EL PASTOREO O LA HENIFICACIÓN, FORRAJE VERDE O ENSILAJE)', label: 'Cultivo forrajero (para el pastoreo o la henificación, forraje verde o ensilaje)' },
  { value: 'OTROS CULTIVOS DE HORTALIZAS, LEGUMBRES Y ESPECIALIDADES HORTÍCOLAS Y RECOLECCIONES NCP', label: 'Otros cultivos de hortalizas, legumbres y especialidades hortícolas y recolecciones NCP' },
  { value: 'CULTIVO DE HORTALIZAS DE RAÍZ Y TUBÉRCULO', label: 'Cultivo de hortalizas de raíz y tubérculo' },
  { value: 'CRÍA DE GANADO VACUNO', label: 'Cría de ganado vacuno' },
  { value: 'CULTIVO DE FLORES Y PLANTAS ORNAMENTALES', label: 'Cultivo de flores y plantas ornamentales' },
  { value: 'CRÍA DE GANADO CAMÉLIDO', label: 'Cría de ganado camélido' },
  { value: 'PRODUCCIÓN DE LECHE CRUDA', label: 'Producción de leche cruda' },
  { value: 'CRÍA DE AVES', label: 'Cría de aves' },
  { value: 'PRODUCCIÓN DE HUEVOS', label: 'Producción de huevos' },
  { value: 'PRODUCCIÓN DE LANA, FIBRA, PELO DE ANIMALES (ESQUILA)', label: 'Producción de lana, fibra, pelo de animales (esquila)' },
  { value: 'CULTIVO DE OLEAGINOSAS', label: 'Cultivo de oleaginosas' },
  { value: 'CRÍA DE GANADO PORCINO', label: 'Cría de ganado porcino' },
  { value: 'OTRAS FRUTAS CULTIVADAS NCP', label: 'Otras frutas cultivadas NCP' },
  { value: 'CULTIVO DE HORTALIZAS DE HOJA', label: 'Cultivo de hortalizas de hoja' },
  { value: 'PRODUCCIÓN DE SEMILLAS Y OTRAS FORMAS DE PROPAGACIÓN DE CULTIVOS AGRÍCOLAS', label: 'Producción de semillas y otras formas de propagación de cultivos agrícolas' },
  { value: 'CULTIVO DE PLANTAS PARA LA OBTENCIÓN DE FIBRAS', label: 'Cultivo de plantas para la obtención de fibras' },
  { value: 'CULTIVO DE HORTALIZAS DE FLOR Y FRUTO', label: 'Cultivo de hortalizas de flor y fruto' },
  { value: 'CULTIVO DE FRUTAS DE CAROZO', label: 'Cultivo de frutas de carozo' },
  { value: 'APICULTURA', label: 'Apicultura' },
  { value: 'CRÍA DE GANADO OVINO, CAPRINO, Y EQUINOS', label: 'Cría de ganado ovino, caprino y equinos' },
  { value: 'CULTIVO DE LEGUMBRES', label: 'Cultivo de legumbres' },
  { value: 'CULTIVO DE ESPECIAS Y DE PLANTAS AROMÁTICAS Y MEDICINALES', label: 'Cultivo de especias y de plantas aromáticas y medicinales' },
  { value: 'CULTIVO DE FRUTAS DE PEPITA', label: 'Cultivo de frutas de pepita' },
  { value: 'CULTIVO DE HORTALIZAS DE BULBO', label: 'Cultivo de hortalizas de bulbo' },
  { value: 'CULTIVO DE FRUTAS CÍTRICAS', label: 'Cultivo de frutas cítricas' },
  { value: 'CULTIVOS DE PLANTAS PARA BEBIDAS Y ESTIMULANTES', label: 'Cultivos de plantas para bebidas y estimulantes' },
  { value: 'ACTIVIDADES DE SERVICIOS AGRÍCOLAS', label: 'Actividades de servicios agrícolas' },
  { value: 'CULTIVOS SACARINOS', label: 'Cultivos sacarinos' },
  { value: 'ACTIVIDADES DE SERVICIOS GANADEROS, EXCEPTO LAS ACTIVIDADES VETERINARIAS', label: 'Actividades de servicios ganaderos, excepto las actividades veterinarias' },
  { value: 'OTROS CULTIVOS NCP', label: 'Otros cultivos NCP' },
  { value: 'CRÍA DE ANIMALES Y OBTENCIÓN DE PRODUCTOS DE ORIGEN ANIMAL NCP', label: 'Cría de animales y obtención de productos de origen animal NCP' },
  { value: 'CULTIVO DE FRUTAS SECAS', label: 'Cultivo de frutas secas' },
];

export const UNIT_OPTIONS = [
  { value: 'HECTAREA', label: 'Hectárea' },
  { value: 'PARCELA', label: 'Parcela' },
  { value: 'MANZANA', label: 'Manzana' },
  { value: 'UNIDAD', label: 'Unidad' },
];
