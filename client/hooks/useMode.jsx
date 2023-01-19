import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import history from '@/utils/history';

const EDIT = 'Edit';
const ADD = 'Add';

const useMode = ({
  type = '',
  addButtonLabel = 'Guardar',
  editButtonLabel = 'Actualizar',
  redirectTo = '',
  onAdd = (values) => new Promise((resolve) => resolve(values)),
  onEdit = (values, id) => new Promise((resolve) => resolve({ ...values, id })),
  fetchById = (id) => new Promise((resolve) => resolve([{ id }])),
  removeValues = [],
}) => {
  const location = useLocation();
  const entityId = location.state?.id;
  const [mode, setMode] = useState(entityId ? EDIT : ADD);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const isEditMode = mode === EDIT;
  const isAddMode = !isEditMode;
  const title = isEditMode ? `Editar ${type}` : `Agregar ${type}`;
  const submitLabel = isEditMode ? editButtonLabel : addButtonLabel;
  const submitFunction = isEditMode ? (values) => onEdit(values, entityId) : onAdd;

  const handleSubmit = (values, { setSubmitting }) => {
    if (!isEditMode && removeValues.length) {
      removeValues.map((key) => delete values[key]);
    }

    submitFunction(values)
      .then((result) => {
        console.log('Result: ', result);
      })
      .then(() => {
        if (redirectTo) {
          history.push(redirectTo);
        }
        // TODO: Display Modal with success state
      })
      .catch((error) => {
        if (type === 'Usuario' || type === 'Producto') {
          setError(error.response.data.details[0].message);
        } else {
          setError(error.message);
        }
      })
      .finally(() => setSubmitting(false));
  };

  useEffect(async () => {
    if (entityId) {
      const response = await fetchById(entityId);
      setData(response.data.data);
    }
  }, []);

  return {
    mode,
    setMode,
    isEditMode,
    isAddMode,
    title,
    error,
    submitLabel,
    handleSubmit,
    initialData: data,
    id: entityId ?? null,
  };
};

export default useMode;
