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

var arreglo;
let a = [];
var cordenadas = "";
var existencia = "";

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
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    arreglo = obj.getnic();
    points();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    cordenadas = "";
    existencia = "";
    a.splice(0, a.length);
  };

  //////////////////

  const orientation = (
    arreglo,
    arreglo2,
    arreglo3,
    arreglo4,
    arreglo5,
    arreglo6
  ) => {
    let val =
      (arreglo4 - arreglo2) * (arreglo5 - arreglo3) -
      (arreglo3 - arreglo) * (arreglo6 - arreglo4);

    if (val == 0) return 0; // colinear

    return val > 0 ? 1 : 2; // clock or counterclock wise
  };

  const doIntersect = (
    arreglo,
    arreglo2,
    arreglo3,
    arreglo4,
    arreglo5,
    arreglo6,
    arreglo7,
    arreglo8
  ) => {
    let o1 = orientation(
      arreglo,
      arreglo2,
      arreglo3,
      arreglo4,
      arreglo5,
      arreglo6
    );
    let o2 = orientation(
      arreglo,
      arreglo2,
      arreglo3,
      arreglo4,
      arreglo7,
      arreglo8
    );
    let o3 = orientation(
      arreglo5,
      arreglo6,
      arreglo7,
      arreglo8,
      arreglo,
      arreglo
    );
    let o4 = orientation(
      arreglo5,
      arreglo6,
      arreglo7,
      arreglo8,
      arreglo3,
      arreglo4
    );
    // General case
    // console.log(o1);
    // console.log(arreglo);
    // console.log(arreglo2);
    // console.log(arreglo3);
    // console.log(arreglo4);
    // console.log(arreglo5);
    // console.log(arreglo6);
    // console.log(arreglo7);
    // console.log(arreglo8);

    //console.log("---------------------------");
    if (o1 != o2 && o3 != o4) {
      getIntersect(
        arreglo,
        arreglo2,
        arreglo3,
        arreglo4,
        arreglo5,
        arreglo6,
        arreglo7,
        arreglo8
      );
      existencia = "Si";
    }
  };

  const getIntersect = (
    arreglo,
    arreglo2,
    arreglo3,
    arreglo4,
    arreglo5,
    arreglo6,
    arreglo7,
    arreglo8
  ) => {
    let a1 = arreglo4 - arreglo2; //B.y - A.y;
    let b1 = arreglo - arreglo3; //A.x - B.x;
    let c1 = a1 * arreglo + b1 * arreglo2; //a1*(A.x) + b1*(A.y);

    // Line CD represented as a2x + b2y = c2
    let a2 = arreglo8 - arreglo6; //D.y - C.y;
    let b2 = arreglo5 - arreglo7; //C.x - D.x;
    let c2 = a2 * arreglo5 + b2 * arreglo6; //a2*(C.x)+ b2*(C.y);

    let determinant = a1 * b2 - a2 * b1;
    let x = ((b2 * c1 - b1 * c2) / determinant).toFixed(2);
    let y = ((a1 * c2 - a2 * c1) / determinant).toFixed(2);

    //console.log("1 "+arreglo2);
    //console.log("2 "+arreglo6);
    a.push(x);
    a.push(y);
    //console.log(x);
    //console.log(Math.ceil(y));
    //console.log("---------------");
  };

  const printList = (x, y, prevX, prevY) => {
    if (x < a.length) {
      let temp1, temp2;
      temp1 = a[x];
      temp2 = a[y];
      //console.log("EJE X= "+temp1+ " EJE Y= "+ temp2);
      if (!(temp1 === prevX) && !(temp2 === prevY)) {
        //console.log("EJE X= "+temp1+ " EJE Y= "+ temp2);
        cordenadas += " ( " + temp1 + " , " + temp2 + " ) " + "        ";
        printList((x = x + 2), (y = y + 2), temp1, temp2);
      } else {
        printList((x = x + 2), (y = y + 2), temp1, temp2);
      }
    }
  };

  const points = () => {
    arreglo = obj.getnic();
    //console.log("nic");
    //console.log(arreglo);
    for (let x = 0; x < arreglo.length - 3; x++) {
      for (let y = 1; y < arreglo.length - 2; y++) {
        doIntersect(
          arreglo[y].x2,
          arreglo[y].x,
          arreglo[y + 1].x2,
          arreglo[y + 1].x,
          arreglo[x].y,
          arreglo[x].x,
          arreglo[x + 1].y,
          arreglo[x + 1].x
        );
        if (
          arreglo[y].x2.toFixed(2) == arreglo[x].y.toFixed(2) &&
          arreglo[y].x.toFixed(2) == arreglo[x].x.toFixed(2)
        ) {
          console.log("iguales");
          //cordenadas+=" ( "+arreglo[y].x2.toFixed(2) + " , "+ Math.ceil(arreglo[y].x) +" ) "+ "        ";
        }
        //console.log("1   "+arreglo[y].x.toFixed(2));
        //console.log("2   "+arreglo[x].x.toFixed(2));
      }
    }
    if (existencia === "") {
      existencia = "No";
    }
    printList(0, 1, "1000", "1000");
    //a.sort((a, b) => a - b);

    //console.log(cordenadas);
  };

  const body = (
    <Paper className={classes.paper}>
      <h2>Azeótropo</h2>
      <hr></hr>
      <h5 className="h5-align">¿Existe?: {existencia} </h5>
      <h5 className="h5-align">Coordenadas: {cordenadas} </h5>
    </Paper>
  );

  return (
    <div>
      <button className="btn-az" type="button" onClick={handleOpen}>
        {" "}
        Azeótropo
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
