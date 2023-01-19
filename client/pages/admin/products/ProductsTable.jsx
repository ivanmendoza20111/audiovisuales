import { deleteProduct, getAllProduct } from '@/api/product';
import { ConfirmDialog } from '@/components/common/confirm-dialog/ConfirmDialog';
import { Notification } from '@/components/common/notification/Notification';
import { Table } from '@/components/common/table/Table';
import history from '@/utils/history';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useEffect, useState } from 'react';

const columns = [
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Nombre' },
  { id: 'brand', label: 'Marca' },
  { id: 'type', label: 'Tipo' },
  { id: 'stock', label: 'Cantidad' },
  { id: 'isActive', label: 'Estado' },
];

const handleClickDelete = async ({
  id,
  product,
  setProduct,
  setNotify,
  setConfirmDialog,
  confirmDialog,
}) => {
  try {
    await deleteProduct(id);
    const newProduct = product.filter((product) => product.id !== id);
    setProduct(newProduct);
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
    pathname: '/dashboard/productos/editar',
    state: { id },
  });
};

export default function ProductTable() {
  const [product, setProduct] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const actions = ({ id }) => {
    return (
      <div>
        <EditOutlinedIcon onClick={() => handleClickEdit(id)} />
        <DeleteOutlineOutlinedIcon
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: '¿Estás seguro que deseas eliminar este producto?',
              subTitle: 'No puedes deshacer está acción!',
              onConfirm: () =>
                handleClickDelete({
                  id: id,
                  product,
                  setProduct,
                  setNotify,
                  setConfirmDialog,
                  confirmDialog,
                }),
            });
          }}
        />
      </div>
    );
  };

  useEffect(async () => {
    if (!product.length) {
      const response = await getAllProduct();
      setProduct(response.data.data.map(({ id, ...product }) => ({ id: id, ...product })));
    }
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        rows={product}
        title={'Productos'}
        link={'/dashboard/productos/agregar'}
        actions={actions}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
