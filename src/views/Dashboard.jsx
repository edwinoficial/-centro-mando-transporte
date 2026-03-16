import {
  Box, Card, CardContent, Chip, Grid, LinearProgress,
  List, ListItem, ListItemText, Paper, Typography,
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const stats = [
  { label: 'Usuarios Registrados', value: '1,284', icon: <PeopleIcon fontSize="large" color="primary" /> },
  { label: 'Vehículos Activos', value: '47', icon: <DirectionsBusIcon fontSize="large" color="secondary" /> },
  { label: 'Viajes Completados', value: '8,531', icon: <CheckCircleIcon fontSize="large" sx={{ color: 'green' }} /> },
  { label: 'Ingresos Mensuales', value: '$124,500', icon: <AttachMoneyIcon fontSize="large" sx={{ color: '#1565c0' }} /> },
]

const activities = [
  { id: 1, desc: 'Viaje #4521 completado — Ruta Norte', status: 'completado', time: 'hace 5 min' },
  { id: 2, desc: 'Conductor Juan Pérez activo en Ruta Sur', status: 'activo', time: 'hace 12 min' },
  { id: 3, desc: 'Viaje #4520 cancelado por usuario', status: 'cancelado', time: 'hace 23 min' },
  { id: 4, desc: 'Viaje #4519 completado — Ruta Centro', status: 'completado', time: 'hace 1 h' },
  { id: 5, desc: 'Vehículo BUS-009 activo en servicio', status: 'activo', time: 'hace 2 h' },
]

const fleetStatus = [
  { label: 'Operativos', value: 80, color: 'success' },
  { label: 'En mantenimiento', value: 12, color: 'warning' },
  { label: 'Fuera de servicio', value: 8, color: 'error' },
]

const statusColor = { completado: 'success', activo: 'primary', cancelado: 'error' }

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>

      <Grid container spacing={3} mb={3}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Card elevation={3}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {s.icon}
                <Box>
                  <Typography variant="h5" fontWeight="bold">{s.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Actividad Reciente</Typography>
            <List dense>
              {activities.map((a) => (
                <ListItem key={a.id} secondaryAction={
                  <Chip label={a.status} color={statusColor[a.status]} size="small" />
                }>
                  <ListItemText primary={a.desc} secondary={a.time} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Estado de la Flota</Typography>
            {fleetStatus.map((f) => (
              <Box key={f.label} mb={2}>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="body2">{f.label}</Typography>
                  <Typography variant="body2">{f.value}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={f.value} color={f.color} />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
