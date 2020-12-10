import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import obj from "../clases/metodos";

obj.orquestador(0, "", "", "", "", "", true);
var arreglo = obj.orquestador("*", "", "", "", "", "", true);

function createData(name, fracciones) {
  return { name, fracciones };
}

const rows = [
  createData(arreglo[0].x, arreglo[0].x2),
  createData(arreglo[1].x, arreglo[1].x2),
  createData(arreglo[2].x, arreglo[2].x2),
  createData(arreglo[3].x, arreglo[3].x2),
  createData(arreglo[4].x, arreglo[4].x2),
  createData(arreglo[5].x, arreglo[5].x2),
  createData(arreglo[6].x, arreglo[6].x2),
  createData(arreglo[7].x, arreglo[7].x2),
  createData(arreglo[8].x, arreglo[8].x2),
  createData(arreglo[9].x, arreglo[9].x2),
  createData(arreglo[10].x, arreglo[10].x2),
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
    margin: "auto",
    width: 600,

    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 600,
  },
  tableContainer: {
    fontSize: "5rem",
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

  const exportToExcel = () => {
    let downloadLink;
    const dataType = "application/vnd.ms-excel";
    const tableSelect = document.getElementById(props.nameG);
    const tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

    // Specify file name
    const filename = "modalFL.xls";

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(["\ufeff", tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = "data:" + dataType + ", " + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  };

  const body = (
    <Paper className={classes.paper}>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} id={props.nameG}>
          <TableHead>
            <TableRow>
              <TableCell>{props.nameG}</TableCell>
              <TableCell align="center">Fracciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {parseFloat(row.name).toFixed(4)}
                </TableCell>
                <TableCell align="center">
                  {parseFloat(row.fracciones).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={exportToExcel}>Exportar tabla</button>
    </Paper>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        {" "}
        Fase Líquida
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
