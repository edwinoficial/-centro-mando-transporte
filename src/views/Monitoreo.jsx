import { useState } from 'react'
import {
  Alert, Box, Divider, InputAdornment, List, ListItem,
  ListItemButton, ListItemText, Paper, TextField, Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const vehicles = [
  { id: 1, plate: 'BUS-001', driver: 'Juan Pérez', route: 'Ruta Norte', lat: 4.711, lng: -74.0721, status: 'Activo' },
  { id: 2, plate: 'BUS-002', driver: 'María López', route: 'Ruta Sur', lat: 4.6951, lng: -74.0838, status: 'Activo' },
  { id: 3, plate: 'BUS-003', driver: 'Carlos Ruiz', route: 'Ruta Centro', lat: 4.7267, lng: -74.054, status: 'Activo' },
  { id: 4, plate: 'BUS-004', driver: 'Lucía Torres', route: 'Ruta Este', lat: 4.7419, lng: -74.032, status: 'Inactivo' },
]

const MAP_CENTER = { lat: 4.711, lng: -74.0721 }
const MAP_OPTIONS = { zoomControl: true, streetViewControl: false, mapTypeControl: false }

export default function Monitoreo() {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [mapRef, setMapRef] = useState(null)

  const filtered = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase()) ||
      v.route.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (v) => {
    setSelectedId(v.id)
    if (mapRef) mapRef.panTo({ lat: v.lat, lng: v.lng })
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Monitoreo
      </Typography>
      <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
        {/* Sidebar */}
        <Paper elevation={3} sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
          <Box p={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar vehículo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
            />
          </Box>
          <Divider />
          <List dense>
            {filtered.map((v) => (
              <ListItem key={v.id} disablePadding>
                <ListItemButton
                  selected={selectedId === v.id}
                  onClick={() => handleSelect(v)}
                >
                  <ListItemText
                    primary={v.plate}
                    secondary={`${v.driver} — ${v.route}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Map */}
        <Box flex={1} minHeight={500}>
          {API_KEY ? (
            <LoadScript googleMapsApiKey={API_KEY}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: 500 }}
                center={MAP_CENTER}
                zoom={12}
                options={MAP_OPTIONS}
                onLoad={(map) => setMapRef(map)}
              >
                {vehicles.map((v) => (
                  <Marker
                    key={v.id}
                    position={{ lat: v.lat, lng: v.lng }}
                    onClick={() => setSelectedId(v.id)}
                  />
                ))}
                {selectedId && (() => {
                  const v = vehicles.find((x) => x.id === selectedId)
                  return v ? (
                    <InfoWindow
                      position={{ lat: v.lat, lng: v.lng }}
                      onCloseClick={() => setSelectedId(null)}
                    >
                      <Box>
                        <Typography variant="subtitle2">{v.plate}</Typography>
                        <Typography variant="body2">{v.driver}</Typography>
                        <Typography variant="body2">{v.route}</Typography>
                        <Typography variant="body2" color={v.status === 'Activo' ? 'green' : 'gray'}>
                          {v.status}
                        </Typography>
                      </Box>
                    </InfoWindow>
                  ) : null
                })()}
              </GoogleMap>
            </LoadScript>
          ) : (
            <Alert severity="warning" sx={{ mt: 2 }}>
              No se encontró la clave de Google Maps API. Por favor, agrega{' '}
              <strong>VITE_GOOGLE_MAPS_API_KEY</strong> en tu archivo <code>.env</code> para
              activar el mapa en tiempo real.
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  )
}
