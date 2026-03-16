# Centro de Mando - Transporte 🚌

Aplicación web de **Centro de Mando** para la gestión y monitoreo de una flota de transporte, construida con **React.js**, **Material-UI**, **React Router** y **Google Maps API**.

---

## 📋 Funcionalidades

- **Dashboard**: Panel principal con estadísticas generales (usuarios, vehículos activos, viajes completados e ingresos), actividad reciente y estado de la flota.
- **Gestión de Usuarios**: Vista completa para agregar, editar, eliminar y buscar usuarios del sistema con roles y estados configurables.
- **Monitoreo**: Panel de seguimiento en tiempo real con mapa de Google Maps, listado de vehículos por estado y ventanas de información por vehículo.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| [React.js](https://reactjs.org/) | Librería principal de UI |
| [Vite](https://vitejs.dev/) | Bundler y servidor de desarrollo |
| [React Router v6](https://reactrouter.com/) | Navegación entre vistas |
| [Material-UI (MUI)](https://mui.com/) | Diseño responsivo y componentes |
| [Axios](https://axios-http.com/) | Cliente HTTP para conexión con el backend |
| [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/) | Integración con Google Maps |

---

## 🚀 Instalación y Ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/edwinoficial/-centro-mando-transporte.git
   cd -centro-mando-transporte
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Copia el archivo `.env.example` y renómbralo a `.env`:

   ```bash
   cp .env.example .env
   ```

   Edita `.env` y agrega tu clave de Google Maps API:

   ```env
   VITE_GOOGLE_MAPS_API_KEY=TU_CLAVE_DE_GOOGLE_MAPS_API_AQUI
   ```

   > **Nota:** El mapa de monitoreo mostrará un aviso si la clave no está configurada, pero el resto de la aplicación funcionará con normalidad.

4. **Iniciar el servidor de desarrollo**

   ```bash
   npm start
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Estructura del Proyecto

```
centro-mando-transporte/
├── public/
├── src/
│   ├── components/
│   │   └── Layout.jsx         # Navbar superior y Sidebar de navegación
│   ├── pages/
│   │   ├── Dashboard.jsx      # Panel principal con estadísticas
│   │   ├── UserManagement.jsx # Gestión de usuarios (CRUD)
│   │   └── Monitoring.jsx     # Monitoreo en tiempo real con Google Maps
│   ├── routes/
│   │   └── AppRoutes.jsx      # Configuración de rutas
│   ├── App.jsx                # Componente raíz con tema y router
│   └── main.jsx               # Punto de entrada
├── .env.example               # Variables de entorno de ejemplo
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔑 Obtener una clave de Google Maps API

1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un nuevo proyecto o selecciona uno existente.
3. Habilita la **Maps JavaScript API**.
4. Crea una clave de API en **Credenciales**.
5. Copia la clave en tu archivo `.env`.

---

## 📦 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo en `localhost:3000` |
| `npm run dev` | Equivalente a `npm start` |
| `npm run build` | Genera la versión de producción en `/dist` |
| `npm run preview` | Previsualiza la versión de producción |

---

## 🔮 Próximas funcionalidades

- [ ] Gestión de conductores y vehículos
- [ ] Sistema de tickets y soporte
- [ ] Reportes y análisis exportables (PDF/Excel)
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Autenticación y control de acceso por roles
- [ ] Integración con backend (Node.js / C# ASP.NET)