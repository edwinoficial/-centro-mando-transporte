import { useState } from 'react'
import {
  Box, Button, Chip, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, IconButton, InputAdornment,
  MenuItem, Paper, Snackbar, Alert, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

const ROLES = ['Administrador', 'Conductor', 'Operador', 'Cliente']

const initialUsers = [
  { id: 1, name: 'Ana García', email: 'ana@example.com', role: 'Administrador' },
  { id: 2, name: 'Luis Martínez', email: 'luis@example.com', role: 'Conductor' },
  { id: 3, name: 'María López', email: 'maria@example.com', role: 'Operador' },
  { id: 4, name: 'Carlos Ruiz', email: 'carlos@example.com', role: 'Cliente' },
]

const emptyForm = { name: '', email: '', role: 'Cliente' }

const roleColor = {
  Administrador: 'error',
  Conductor: 'primary',
  Operador: 'warning',
  Cliente: 'default',
}

export default function Usuarios() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setForm(emptyForm); setEditId(null); setFormOpen(true) }
  const openEdit = (u) => { setForm({ name: u.name, email: u.email, role: u.role }); setEditId(u.id); setFormOpen(true) }
  const openDelete = (id) => { setDeleteId(id); setDeleteOpen(true) }

  const handleSave = () => {
    if (!form.name || !form.email) return
    if (editId) {
      setUsers((prev) => prev.map((u) => (u.id === editId ? { ...u, ...form } : u)))
      setSnackbar({ open: true, message: 'Usuario actualizado', severity: 'success' })
    } else {
      setUsers((prev) => [...prev, { id: Date.now(), ...form }])
      setSnackbar({ open: true, message: 'Usuario agregado', severity: 'success' })
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteId))
    setSnackbar({ open: true, message: 'Usuario eliminado', severity: 'info' })
    setDeleteOpen(false)
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">Gestión de Usuarios</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
          Agregar
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Buscar por nombre, email o rol…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
      />

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Chip label={u.role} color={roleColor[u.role]} size="small" />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openEdit(u)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => openDelete(u.id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">Sin resultados</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus margin="normal" label="Nombre" fullWidth
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="normal" label="Email" type="email" fullWidth
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            select margin="normal" label="Rol" fullWidth
            value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            {ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro de que deseas eliminar este usuario?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
