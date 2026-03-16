import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const ROLES = ['Administrador', 'Conductor', 'Operador', 'Cliente'];

const initialUsers = [
  { id: 1, name: 'Carlos Gómez', email: 'carlos@transporte.com', role: 'Conductor', status: 'activo' },
  { id: 2, name: 'María López', email: 'maria@transporte.com', role: 'Operador', status: 'activo' },
  { id: 3, name: 'Pedro Sánchez', email: 'pedro@transporte.com', role: 'Cliente', status: 'inactivo' },
  { id: 4, name: 'Ana Torres', email: 'ana@transporte.com', role: 'Conductor', status: 'activo' },
  { id: 5, name: 'Luis Martínez', email: 'luis@transporte.com', role: 'Administrador', status: 'activo' },
];

const emptyForm = { name: '', email: '', role: 'Cliente', status: 'activo' };

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (user) => {
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setEditingId(user.id);
    setDialogOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) return;

    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...u, ...formData } : u))
      );
      showSnackbar('Usuario actualizado correctamente', 'success');
    } else {
      const newUser = { id: Date.now(), ...formData };
      setUsers((prev) => [...prev, newUser]);
      showSnackbar('Usuario agregado correctamente', 'success');
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deletingId));
    setDeleteDialogOpen(false);
    showSnackbar('Usuario eliminado correctamente', 'warning');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Administra los usuarios del sistema de transporte
      </Typography>

      <Card elevation={2}>
        <CardContent>
          {/* Barra de herramientas */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
            <TextField
              size="small"
              placeholder="Buscar usuarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ minWidth: 250 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
            >
              Agregar Usuario
            </Button>
          </Box>

          {/* Tabla de usuarios */}
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Correo</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rol</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography color="text.secondary" py={2}>
                        No se encontraron usuarios
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.status === 'activo' ? 'Activo' : 'Inactivo'}
                          color={user.status === 'activo' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenEdit(user)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleOpenDelete(user.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Diálogo agregar/editar */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Nombre completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Correo electrónico"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Rol"
            select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            fullWidth
          >
            {ROLES.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Estado"
            select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            fullWidth
          >
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name.trim() || !formData.email.trim()}
          >
            {editingId ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo confirmar eliminación */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs">
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserManagement;
