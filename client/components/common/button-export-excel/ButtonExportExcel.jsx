import { Button } from '@/components/common/form';
import { Notification } from '@/components/common/notification/Notification';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Fragment, useCallback, useState } from 'react';
import { utils, writeFileXLSX } from 'xlsx';

const useStyles = makeStyles(() => ({
  exportButton: {
    width: '100px',
  },
}));

export default function ButtonExportExcel({ data, fileName }) {
  const classes = useStyles();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const exportFile = useCallback(() => {
    try {
      const workSheet = utils.json_to_sheet(data);
      const workBook = utils.book_new();
      utils.book_append_sheet(workBook, workSheet, 'Data');
      writeFileXLSX(workBook, `${fileName}.xlsx`);
      setNotify({
        isOpen: true,
        message: `Se ha exportado el reporte ${fileName}.xlsx correctamente `,
        type: 'success',
      });
    } catch (error) {
      setNotify({
        isOpen: true,
        message: `Ha ocurriedo un error al momento de exportar el reporte`,
        type: 'error',
      });
    }
  }, [data]);

  return (
    <Fragment>
      <Button onClick={exportFile} className={classes.exportButton}>
        EXPORTAR A EXCEL
      </Button>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}

ButtonExportExcel.propTypes = {
  data: PropTypes.array.isRequired,
  fileName: PropTypes.string.isRequired,
};
