import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Alert,
  TextField,
} from '@mui/material';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const MAP_CONTAINER_STYLE = { width: '100%', height: '450px' };

const DEFAULT_CENTER = { lat: 19.4326, lng: -99.1332 }; // Ciudad de México

const vehicles = [
  { id: 'V001', driver: 'Carlos Gómez', lat: 19.435, lng: -99.135, status: 'en_servicio', route: 'Ruta 1' },
  { id: 'V002', driver: 'María López', lat: 19.428, lng: -99.128, status: 'en_servicio', route: 'Ruta 3' },
  { id: 'V003', driver: 'Pedro Sánchez', lat: 19.442, lng: -99.142, status: 'disponible', route: 'Sin ruta' },
  { id: 'V004', driver: 'Ana Torres', lat: 19.421, lng: -99.148, status: 'en_servicio', route: 'Ruta 2' },
  { id: 'V005', driver: 'Luis Martínez', lat: 19.438, lng: -99.121, status: 'mantenimiento', route: 'Sin ruta' },
];

const statusConfig = {
  en_servicio: { label: 'En Servicio', color: 'success' },
  disponible: { label: 'Disponible', color: 'primary' },
  mantenimiento: { label: 'En Mantenimiento', color: 'warning' },
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

function Monitoring() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    if (map) {
      map.panTo({ lat: vehicle.lat, lng: vehicle.lng });
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Monitoreo en Tiempo Real
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Seguimiento y ubicación de la flota de vehículos
      </Typography>

      <Grid container spacing={3}>
        {/* Panel lateral con lista de vehículos */}
        <Grid item xs={12} md={3}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Vehículos ({vehicles.length})
              </Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="Buscar vehículo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
              />
              <List dense>
                {filteredVehicles.map((vehicle) => (
                  <ListItem
                    key={vehicle.id}
                    button
                    onClick={() => handleVehicleSelect(vehicle)}
                    selected={selectedVehicle?.id === vehicle.id}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      cursor: 'pointer',
                      '&.Mui-selected': { bgcolor: 'primary.light' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <FiberManualRecordIcon
                        fontSize="small"
                        color={statusConfig[vehicle.status]?.color}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="bold">
                          {vehicle.id}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="caption" display="block">
                            {vehicle.driver}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {vehicle.route}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Mapa principal */}
        <Grid item xs={12} md={9}>
          <Card elevation={2}>
            <CardContent>
              {/* Leyenda de estado */}
              <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                {Object.entries(statusConfig).map(([key, val]) => (
                  <Chip
                    key={key}
                    icon={<DirectionsBusIcon />}
                    label={val.label}
                    color={val.color}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>

              {!GOOGLE_MAPS_API_KEY && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Para activar el mapa, configura la variable de entorno{' '}
                  <strong>VITE_GOOGLE_MAPS_API_KEY</strong> con tu clave de Google Maps API en
                  el archivo <code>.env</code>.
                </Alert>
              )}

              {loadError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Error al cargar Google Maps. Verifica tu clave de API.
                </Alert>
              )}

              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={MAP_CONTAINER_STYLE}
                  center={DEFAULT_CENTER}
                  zoom={13}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {vehicles.map((vehicle) => (
                    <Marker
                      key={vehicle.id}
                      position={{ lat: vehicle.lat, lng: vehicle.lng }}
                      title={vehicle.id}
                      onClick={() => setSelectedVehicle(vehicle)}
                    />
                  ))}

                  {selectedVehicle && (
                    <InfoWindow
                      position={{ lat: selectedVehicle.lat, lng: selectedVehicle.lng }}
                      onCloseClick={() => setSelectedVehicle(null)}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {selectedVehicle.id}
                        </Typography>
                        <Typography variant="body2">Conductor: {selectedVehicle.driver}</Typography>
                        <Typography variant="body2">Ruta: {selectedVehicle.route}</Typography>
                        <Chip
                          label={statusConfig[selectedVehicle.status]?.label}
                          color={statusConfig[selectedVehicle.status]?.color}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <Box
                  sx={{
                    ...MAP_CONTAINER_STYLE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#e8eaf6',
                    borderRadius: 1,
                  }}
                >
                  <Typography color="text.secondary">
                    {loadError ? 'Error al cargar el mapa' : 'Cargando mapa...'}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Monitoring;
