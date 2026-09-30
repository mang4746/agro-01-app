# AGRO-01 App

Aplicación móvil para realizar el registro del formulario AGRO-01, incluyendo preregistro, registro y resultado final de scoring crediticio.

## Descripción

- Registro de preregistro del cliente.
- Captura del formulario AGRO-01.
- Envío de información a un backend para validación y procesamiento.
- Visualización de los resultados del scoring crediticio en una pantalla final.

## Tecnologías

- NativeWind
- React Native Paper
- Vector Icons
- Expo + React Native

## Repositorios involucrados

| Repositorio | Enlace |
|---|---|
| App móvil | `URL_DEL_REPOSITORIO` |
| Backend principal | `https://gitlab.com/mang4746/agro-01-backend` |
| Servicio de scoring | `URL_DEL_REPOSITORIO` |
| Base de datos Oracle | `URL_DEL_REPOSITORIO` |


## Configuración rápida

1. Instala dependencias:

```bash
npm install
```

2. Crea tu archivo de entorno:

```bash
copy .env.example .env.local
```

3. Ajusta la URL del backend:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

## Comandos principales

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Requisito

El proyecto requiere que el backend esté activo para que el flujo de preregistro, registro y scoring funcione correctamente.
