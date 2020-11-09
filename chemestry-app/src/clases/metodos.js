import OBJETOConstantesAntoine from "../clases/constantesAntoine";

const OBJETO = sitemaIdeal();
var nombreSis1, nombreSis2, nombreVar, nombreConst, nombreGrado, respuesta,nombreCambio;

var t, p, peb1, peb2, xa, xb, psup, tSup;

function orquestador(
  tipo,
  nombreSistema1,
  nombreSistema2,
  variable,
  constante,
  grado,
  cambioo,
) {
  if (nombreSis1 === undefined) {
    //~EVALUA EL PRIMER MOMENTO DEL CODIGO CUANDO SE ABRE LA APLICACION
    nombreSis1 = "acetona"; //~ MODO DEFAULT
  } else {
    if (nombreSistema1 !== "") {
      nombreSis1 = nombreSistema1;
    }
  }

  if (nombreSis2 === undefined) {
    nombreSis2 = "cloroformo";
  } else {
    if (nombreSistema2 !== "") {
      nombreSis2 = nombreSistema2;
    }
  }

  if (nombreVar === undefined) {
    nombreVar = "Presion";
  } else {
    if (variable !== "") {
      nombreVar = variable;
    }
  }

  if (nombreConst === undefined) {
    nombreConst = "Temperatura";
  } else {
    if (constante !== "") {
      nombreConst = constante;
    }
  }

  if (nombreGrado === undefined) {
    nombreGrado = 200;
  } else {
    if (constante !== "") {
      nombreGrado = grado;
    }
  }
nombreCambio=cambioo;
  if (tipo === 0) {
    return sitemaIdeal();
  } else if(tipo === "*"){
    return getnic();
  }else{
    return sistemaReal();
  }
}

function sistemaReal() {
  return "hola";
}

function sitemaIdeal() {
  var OBJETO = {
    variable: nombreVar,
    gradoo: nombreGrado,
    bandera:0,
    n: 11,
    c_antonie1: OBJETOConstantesAntoine[nombreSis1], //!!!!CAMBIAR VALORES
    c_antonie2: OBJETOConstantesAntoine[nombreSis2],
    x1: x1(11),
    x2: x2(11),
    T_general: t_general(x1, x2, 11),
    //*ASI INVOCAS METODOS EN JAVASCRIPT -> NICOLE
    orquestador: orquestador,
    nic:nic,
    getnic:getnic,
    cambio:nombreCambio,
    getcambio:getcambio,
    setCambio:setCambio,
  };

  var T_general = t_general(OBJETO.x1, OBJETO.x2, OBJETO.n);

  //& SISTEMA IDEAL TEMPERATURA CONSTANTE
  if (nombreConst === "Presion") {
    t = nombreGrado;
    //~ CALCULO DE LAS PRESIONES DE LAS SOLUCIONES
    //^ PRESION DE LA ESPECIE 1
    peb1 = Math.pow(
      10,
      OBJETO.c_antonie1[0] - OBJETO.c_antonie1[1] / (OBJETO.c_antonie1[2] + t)
    );
    console.log("peb1 = " + peb1);
    //^ PRESION DE LA ESPECIE 2
    peb2 = Math.pow(
      10,
      OBJETO.c_antonie2[0] - OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[2] + t)
    );
    console.log("peb2 = " + peb2);
    for (let j = 0; j <= OBJETO.n; j++) {
      xa = peb1 * 0.2;
      console.log("xa = " + xa);
      xb = peb2 * 1.8;
      console.log("xb = " + xb);
      psup = (xa + xb) / 2;
      console.log("psup = " + psup);
      T_general[j][7] = 0;
      while (Math.abs(T_general[j][7] - 1) > 0.001) {
        psup = (xa + xb) / 2;
        T_general[j][3] = (T_general[j][1] * peb1) / psup; //*Calculo de y2
        T_general[j][6] = (T_general[j][4] * peb2) / psup; //*Calculo de y2
        T_general[j][7] = T_general[j][3] + T_general[j][6];
        if (T_general[j][7] > 1) {
          xa = psup;
        } else {
          xb = psup;
        }
      }
      T_general[j][0] = psup;
      console.log(T_general[j][0]);
      T_general[j][2] =
        OBJETO.c_antonie1[1] /
          (OBJETO.c_antonie1[0] - Math.log(T_general[j][0])) -
        OBJETO.c_antonie1[2];
      console.log(T_general[j][2]);
      T_general[j][5] =
        OBJETO.c_antonie2[1] /
          (OBJETO.c_antonie2[0] - Math.log(T_general[j][0])) -
        OBJETO.c_antonie2[2];
      console.log(T_general[j][5]);
    }
    console.log(JSON.stringify(T_general));
  } else if (nombreConst === "Temperatura") {
    p = nombreGrado;
    T_general[OBJETO.n][0] =
      OBJETO.c_antonie1[1] / (OBJETO.c_antonie1[0] - Math.log10(p)) -
      OBJETO.c_antonie1[2];
    T_general[0][0] =
      OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[0] - Math.log10(p)) -
      OBJETO.c_antonie2[2];
    for (let i = 0; i <= OBJETO.n; i++) {
      //^ PARA QUE LA TEMPERATURA SE AJUSTE
      xa = T_general[OBJETO.n][0] * 0.2; //^TEMPERATURA BAJA
      xb = T_general[0][0] * 1.8; //^TEMPERATURA ALTA
      tSup = xa / xb / 2;
      T_general[i][7] = 0;
      while (Math.abs(T_general[i][7] - 1) > 0.001) {
        tSup = (xa + xb) / 2; //Temperatura de suposicion del sisteme en °C
        T_general[i][2] = Math.pow(
          10,
          OBJETO.c_antonie1[0] -
            OBJETO.c_antonie1[1] / (OBJETO.c_antonie1[2] + tSup)
        ); //Presiones de saturación especie 1
        //console.log(Math.pow(10, (OBJETO.c_antoine1[0]-OBJETO.c_antoine1[1]/(OBJETO.c_antoine1[2]+tSup))));
        T_general[i][5] = Math.pow(
          10,
          OBJETO.c_antonie2[0] -
            OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[2] + tSup)
        ); //*Presiones de saturación especie 2
        T_general[i][3] = (T_general[i][1] * T_general[i][2]) / p; //*Calculo de y1
        T_general[i][6] = (T_general[i][4] * T_general[i][5]) / p; //*Calculo de y2
        T_general[i][7] = T_general[i][3] + T_general[i][6];
        if (T_general[i][7] > 1) {
          xb = tSup;
        } else {
          xa = tSup;
        }
      }
      T_general[i][0] = tSup;
    }
    console.log(JSON.stringify(T_general));
  }

  

  OBJETO.respuesta=nic(T_general);

  return OBJETO;
}

function getnic() {
  return respuesta;
}

function getcambio(){
  return nombreCambio;
}

function setCambio(){
  nombreCambio=false;
  return false;
}

function nic(T_general){
  respuesta = [
    {
      x: T_general[0][0],//***Esto es Y y no cambia */
      y: T_general[0][3],
      x2: T_general[0][1],
    },
    {
      x: T_general[1][0],
      y: T_general[1][3],
      x2: T_general[1][1],
    },
    {
      x: T_general[2][0],
      y: T_general[2][3],
      x2: T_general[2][1],
    },
    {
      x: T_general[3][0],
      y: T_general[3][3],
      x2: T_general[3][1],
    },
    {
      x: T_general[4][0],
      y: T_general[4][3],
      x2: T_general[4][1],
    },
    {
      x: T_general[5][0],
      y: T_general[5][3],
      x2: T_general[5][1],
    },
    {
      x: T_general[7][0],
      y: T_general[7][3],
      x2: T_general[7][1],
    },
    {
      x: T_general[8][0],
      y: T_general[8][3],
      x2: T_general[8][1],
    },
    {
      x: T_general[9][0],
      y: T_general[9][3],
      x2: T_general[9][1],

    },
    {
      x: T_general[10][0],
      y: T_general[10][3],
      x2: T_general[10][1],

    },
    {
      x: T_general[11][0],
      y: T_general[11][3],
      x2: T_general[11][1],
    },
    {
      x: 10000,
      y: 10000,
      x2:10000,
    },
  ];
  return respuesta;
}

function x1(n) {
  var arreglo = [0],
    valorInicio = 0;
  while (valorInicio < 1) {
    var tF = (valorInicio += 1 / 11 || 1);
    arreglo.push(tF.toFixed(1));
  }
  return arreglo;
}

function x2(n) {
  let arreglo = [1],
    valorInicio = 1;
  while (valorInicio > 0) {
    let tF = (valorInicio -= 1 / n || 1);
    arreglo.push(tF.toFixed(1));
  }
  arreglo.pop();
  arreglo.push(0);
  return arreglo;
}

function t_general(x1, x2, n) {
  let matrix = [0];
  for (let i = 0; i <= n; i++) {
    matrix[i] = [0, 0, 0, 0, 0, 0, 0, 0];
  }
  for (let i = 0; i <= n; i++) {
    matrix[i][1] = x1[i];
    matrix[i][4] = x2[i];
  }
  matrix[0][3] = 0;
  matrix[n - 1][3] = 1;
  matrix[0][6] = 1;
  matrix[n - 1][6] = 0;
  return matrix;
}

export default OBJETO;
