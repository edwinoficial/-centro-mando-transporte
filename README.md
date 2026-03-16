# Centro de Mando — Transporte

Centro de mando para la gestión de flotas de transporte, construido con **Vite + React**, **Material UI v6** y **React Router v6**.

## Vistas

- **Dashboard** (`/`): Estadísticas generales, actividad reciente y estado de la flota.
- **Gestión de Usuarios** (`/usuarios`): Tabla con búsqueda en vivo, alta, edición y baja de usuarios.
- **Monitoreo** (`/monitoreo`): Mapa en tiempo real con Google Maps y lista lateral de vehículos.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Configuración

Copia el archivo de ejemplo y agrega tu clave de Google Maps:

```bash
cp .env.example .env
```

Edita `.env`:

```
VITE_GOOGLE_MAPS_API_KEY=tu_clave_aqui
```

> Si no tienes la clave, la vista de Monitoreo muestra un aviso en lugar de fallar.

## Ejecución

```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Tecnologías

| Librería | Uso |
|---|---|
| [Vite](https://vitejs.dev/) | Build tool y dev server |
| [React 18](https://react.dev/) | UI framework |
| [Material UI v6](https://mui.com/) | Componentes y tema |
| [React Router v6](https://reactrouter.com/) | Navegación SPA |
| [Axios](https://axios-http.com/) | Peticiones HTTP |
| [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/) | Integración Google Maps |
