import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';

const statsCards = [
  {
    title: 'Usuarios Registrados',
    value: '1,248',
    icon: <PeopleIcon fontSize="large" />,
    color: '#1565c0',
    change: '+12% este mes',
  },
  {
    title: 'Vehículos Activos',
    value: '87',
    icon: <DirectionsBusIcon fontSize="large" />,
    color: '#2e7d32',
    change: '5 en mantenimiento',
  },
  {
    title: 'Viajes Completados',
    value: '3,541',
    icon: <CheckCircleIcon fontSize="large" />,
    color: '#f57c00',
    change: '+8% esta semana',
  },
  {
    title: 'Ingresos del Mes',
    value: '$24,780',
    icon: <TrendingUpIcon fontSize="large" />,
    color: '#6a1b9a',
    change: '+15% vs mes anterior',
  },
];

const recentActivity = [
  { user: 'Carlos Gómez', action: 'Completó viaje #4521', time: 'Hace 5 min', status: 'completado' },
  { user: 'María López', action: 'Inició viaje #4522', time: 'Hace 12 min', status: 'activo' },
  { user: 'Pedro Sánchez', action: 'Canceló viaje #4519', time: 'Hace 18 min', status: 'cancelado' },
  { user: 'Ana Torres', action: 'Completó viaje #4518', time: 'Hace 30 min', status: 'completado' },
  { user: 'Luis Martínez', action: 'Inició viaje #4523', time: 'Hace 45 min', status: 'activo' },
];

const statusColors = {
  completado: 'success',
  activo: 'primary',
  cancelado: 'error',
};

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Resumen general de las operaciones de transporte
      </Typography>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} mb={4}>
        {statsCards.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.title}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {card.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {card.change}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: card.color, width: 56, height: 56 }}>
                    {card.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Actividad reciente */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Actividad Reciente
              </Typography>
              <List>
                {recentActivity.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" disableGutters>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" fontWeight="medium">
                              {item.user}
                            </Typography>
                            <Chip
                              label={item.status}
                              color={statusColors[item.status]}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.primary">
                              {item.action}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Estado de la Flota
              </Typography>
              {[
                { label: 'En servicio', count: 72, color: '#2e7d32' },
                { label: 'Disponibles', count: 10, color: '#1565c0' },
                { label: 'En mantenimiento', count: 5, color: '#f57c00' },
                { label: 'Fuera de servicio', count: 5, color: '#c62828' },
              ].map((item) => (
                <Box key={item.label} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {item.count}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e0e0e0',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${(item.count / 92) * 100}%`,
                        bgcolor: item.color,
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
