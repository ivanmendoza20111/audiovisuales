import { deleteUser, getAllUsers } from '@/api/user';
import { ConfirmDialog } from '@/components/common/confirm-dialog/ConfirmDialog';
import { Notification } from '@/components/common/notification/Notification';
import { Table } from '@/components/common/table/Table';
import history from '@/utils/history';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useEffect, useState } from 'react';

const columns = [
  { id: 'id', label: 'ID', minWidth: 150 },
  { id: 'role', label: 'Role', minWidth: 80 },
  { id: 'username', label: 'Nombre de Usuario', minWidth: 120 },
  { id: 'name', label: 'Nombre', minWidth: 160 },
  { id: 'surname', label: 'Apellido', minWidth: 160 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Teléfono', minWidth: 100 },
];

const handleClickDelete = async ({
  id,
  users,
  setUsers,
  setNotify,
  setConfirmDialog,
  confirmDialog,
}) => {
  try {
    await deleteUser(id);
    const newUsers = users.filter((users) => users.id !== id);
    setUsers(newUsers);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setNotify({
      isOpen: true,
      message: 'Se ha eliminado correctamente',
      type: 'success',
    });
  } catch (error) {
    console.error(error);
  }
};

const handleClickEdit = (id) => {
  history.push({
    pathname: '/dashboard/usuario/editar',
    state: { id },
  });
};

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const actions = ({ id }) => (
    <div>
      <EditOutlinedIcon onClick={() => handleClickEdit(id)} />
      <DeleteOutlineOutlinedIcon
        onClick={() => {
          setConfirmDialog({
            isOpen: true,
            title: '¿Estás seguro que deseas eliminar este Usuario?',
            subTitle: 'No puedes deshacer está acción!',
            onConfirm: () =>
              handleClickDelete({
                id: id,
                users,
                setUsers,
                setNotify,
                setConfirmDialog,
                confirmDialog,
              }),
          });
        }}
      />
    </div>
  );

  useEffect(async () => {
    if (!users.length) {
      const response = await getAllUsers();
      setUsers(response.data.data.map(({ userId, ...user }) => ({ id: userId, ...user })));
    }
  }, []);

  return (
    <>
      <Table
        columns={columns}
        rows={users}
        actions={actions}
        title={'Usuarios'}
        link={'/dashboard/usuario/agregar'}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
};

export default UserTable;
