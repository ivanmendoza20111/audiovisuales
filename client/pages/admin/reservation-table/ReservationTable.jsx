import ButtonExportExcel from '@/components/common/button-export-excel/ButtonExportExcel';
import { ConfirmDialog } from '@/components/common/confirm-dialog/ConfirmDialog';
import { Notification } from '@/components/common/notification/Notification';
import { Table } from '@/components/common/table/Table';
import DateFilter from '@/components/reservation/DateFilter';
import useAssistantStore from '@/stores/assistantStore';
import useReservationStore from '@/stores/reservationStore';
import { formatData } from '@/utils/format';
import Grid from '@material-ui/core/Grid';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'userClassroom', label: 'Aula' },
  { id: 'userName', label: 'Nombre' },
  { id: 'profName', label: 'Profesor' },
  { id: 'fromDate', label: 'Fecha inicial' },
  { id: 'toDate', label: 'Fecha final' },
  { id: 'productsDescription', label: 'Equipos' },
  { id: 'assistantId', label: 'Auxiliar' },
  { id: 'isActive', label: 'Estado' },
];

const formatDataTable = (data) => {
  return data.map((item) => {
    let result = {};
    columns.forEach((column) => {
      if (Object.prototype.hasOwnProperty.call(item, column.id)) {
        result[column.label] = formatData({ value: item[column.id], key: column.id });
      }
    });

    return result;
  });
};

export default function ReservationTable() {
  const {
    filteredRes,
    fetchAllReservations,
    getReservationIdxById,
    setFilteredRes,
    update: updateReservation,
  } = useReservationStore((state) => state);
  const fetchAllAssistants = useAssistantStore((state) => state.fetchAllAssistants);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const formattedData = useMemo(() => formatDataTable(filteredRes), [JSON.stringify(filteredRes)]);

  useEffect(() => {
    fetchAllReservations();
    fetchAllAssistants();
  }, []);

  const actions = ({ id }) => {
    return (
      <div>
        <CancelOutlinedIcon
          onClick={() => {
            Swal.fire({
              title: '¿Esta seguro que desea cancelar esta reservación?',
              text: 'Cuando afirme, se enviara un correo al solicitante avisándole sobre la cancelación.',
              showCancelButton: true,
              confirmButtonText: 'Sí',
              cancelButtonText: 'Cancelar',
            }).then(async (result) => {
              if (result.isConfirmed) {
                await updateReservation({ isActive: 0 }, id);
                const resIdx = getReservationIdxById(id);
                filteredRes[resIdx].isActive = 0;
                setFilteredRes(filteredRes);
              }
            });
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Table columns={columns} rows={filteredRes} title={'Reservaciones'} actions={actions}>
        <Grid container justifyContent="space-between">
          <DateFilter />
          <ButtonExportExcel
            data={formattedData}
            fileName={`reporte-reservaciones-${moment().format('YYYY_MM_DD-hh_mm')}`}
          />
        </Grid>
      </Table>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
