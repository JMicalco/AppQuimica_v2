import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import obj from "../clases/metodos";

obj.orquestador(0,"","","","","",true);
var arreglo=obj.orquestador("*","","","","","",true);

function createData(name, fracciones) {
  return { name, fracciones};
}

const rows = [
  createData(arreglo[0].x,arreglo[0].y),
  createData(arreglo[1].x,arreglo[1].y),
  createData(arreglo[2].x,arreglo[2].y),
  createData(arreglo[3].x,arreglo[3].y),
  createData(arreglo[4].x,arreglo[4].y),
  createData(arreglo[5].x,arreglo[5].y),
  createData(arreglo[6].x,arreglo[6].y),
  createData(arreglo[7].x,arreglo[7].y),
  createData(arreglo[8].x,arreglo[8].y),
  createData(arreglo[9].x,arreglo[9].y),
  createData(arreglo[10].x,arreglo[10].y),
];

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    arreglo = obj.getnic();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{props.nameG}</TableCell>
            <TableCell align="left">Fracciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.fracciones}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}> Fase Gaseosa
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}