import { Button } from '@/components/common/form';
import { formatData } from '@/utils/format';
import { CircularProgress, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import MaterialUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '0 auto',
  },
  container: {
    maxHeight: 440,
    backgroundColor: '#fff',
  },
  link: {
    color: '#ffffff',
  },
});

export const Table = ({ columns, rows, title, link, actions: Actions, children }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    setPage(0);
  }, [JSON.stringify(rows)]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return !rows ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      {!rows ? (
        <CircularProgress />
      ) : (
        <div>
          <Grid container>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography variant="h4" gutterBottom>
                {title}
              </Typography>
              {!!link && (
                <Button>
                  <Link to={link} className={classes.link}>
                    AGREGAR {title.toUpperCase()}
                  </Link>
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
          <Paper>
            <TableContainer className={classes.container}>
              <MaterialUITable stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell key={'actions'}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.Body}>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={`row-${row.id}`}>
                        {columns.map((column) => {
                          const value = formatData({ value: row[column.id], key: column.id });

                          return (
                            <TableCell key={`cell-${column.id}`} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                        <TableCell key={'actions'}>{<Actions id={row.id} />}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </MaterialUITable>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  title: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.element,
  actions: PropTypes.func,
};
