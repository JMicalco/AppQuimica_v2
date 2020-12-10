import OBJETOConstantesAntoine from "../clases/constantesAntoine";
import OBJETOAlphaMargules from "../clases/margules";
import OBJETOAlphaWilson from "../clases/wilson";
import OBJETOAlphaVanLaar from "../clases/vanLaar";

const OBJETO = sitemaIdeal();
var nombreSis1,
  nombreSis2,
  nombreVar,
  nombreConst,
  nombreGrado,
  respuesta,
  nombreCambio,
  nombreMetodo,
  nombreTipo;
var t,
  p,
  peb1,
  peb2,
  xa,
  xb,
  psup,
  tSup,
  tipoS,
  gama1,
  gama2,
  ge_sol1,
  ge_sol2,
  peso_sol1,
  peso_sol2,
  v_molar1,
  v_molar2,
  dif_Lambda1,
  dif_Lambda2,
  lambda12,
  lambda21;

function orquestador(
  tipo,
  nombreSistema1,
  nombreSistema2,
  variable,
  constante,
  grado,
  metodo
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

  if (nombreTipo === undefined) {
    nombreTipo = 0;
  } else if (tipo !== 10) {
    nombreTipo = tipo;
  }

  if (nombreMetodo === undefined) {
    nombreMetodo = 0;
  } else if (metodo !== 10) {
    nombreMetodo = metodo;
  }

  if (nombreTipo === 0 && nombreMetodo === 0) {
    tipoS = 0;
    return sitemaIdeal();
  } else if (tipo === "*") {
    return getnic();
  } else {
    tipoS = 1;
    return sistemaReal(nombreMetodo);
  }
}

function sistemaReal(nombreMetodo) {
  const r = 1.9872;
  var met = nombreMetodo;
  let OBJETO = {
    variable: nombreVar,
    gradoo: nombreGrado,
    bandera: 0,
    tipos: tipoS,
    n: 11,
    c_antonie1: OBJETOConstantesAntoine[nombreSis1],
    hey: nombreMetodo,
    aplha12: OBJETOAlphaMargules[nombreSis1 + nombreSis2],
    aplha21: OBJETOAlphaMargules[nombreSis1 + nombreSis2],
    c_antonie2: OBJETOConstantesAntoine[nombreSis2],
    wilson: OBJETOAlphaWilson[nombreSis1 + nombreSis2],
    alpha12V: OBJETOAlphaVanLaar[nombreSis1 + nombreSis2],
    alpha21V: OBJETOAlphaVanLaar[nombreSis1 + nombreSis2],
    // vanLaar: OBJETOAlphaVanLaar[nombreSis1 + nombreSis2],
    x1: x1(11),
    x2: x2(11),
    T_general: t_general(x1, x2, 11),
    //*ASI INVOCAS METODOS EN JAVASCRIPT -> NICOLE
    orquestador: orquestador,
    nic: nic,
    getnic: getnic,
    cambio: nombreCambio,
    getTipo: getTipo,
  };
  var T_general = t_general(OBJETO.x1, OBJETO.x2, OBJETO.n);
  if (nombreConst === "Presion") {
    t = nombreGrado;
    peb1 = Math.pow(
      10,
      OBJETO.c_antonie1[0] - OBJETO.c_antonie1[1] / (OBJETO.c_antonie1[2] + t)
    );
    peb2 = Math.pow(
      10,
      OBJETO.c_antonie2[0] - OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[2] + t)
    );
    if (met === 1) {
      for (let j = 0; j <= OBJETO.n; j++) {
        gama1 = Math.exp(
          (OBJETO.aplha12[0] +
            2 * (OBJETO.aplha21[1] - OBJETO.aplha12[0]) * T_general[j][1]) *
            Math.pow(T_general[j][4], 2)
        );
        gama2 = Math.exp(
          (OBJETO.aplha21[1] +
            2 * (OBJETO.aplha12[0] - OBJETO.aplha21[1]) * T_general[j][4]) *
            Math.pow(T_general[j][1], 2)
        );
        xa = peb1 * 0.2;
        xb = peb2 * 1.8;
        psup = (xa + xb) / 2;
        T_general[j][7] = 0;
        while (Math.abs(T_general[j][7] - 1) > 0.001) {
          psup = (xa + xb) / 2;
          T_general[j][3] = (gama1 * T_general[j][1] * peb1) / psup; //*Calculo de y2
          T_general[j][6] = (gama2 * T_general[j][4] * peb2) / psup; //*Calculo de y2
          T_general[j][7] = T_general[j][3] + T_general[j][6];
          if (T_general[j][7] > 1) {
            xa = psup;
          } else {
            xb = psup;
          }
        }
        T_general[j][0] = psup;
        T_general[j][2] =
          OBJETO.c_antonie1[1] /
            (OBJETO.c_antonie1[0] - Math.log(T_general[j][0])) -
          OBJETO.c_antonie1[2];
        T_general[j][5] =
          OBJETO.c_antonie2[1] /
            (OBJETO.c_antonie2[0] - Math.log(T_general[j][0])) -
          OBJETO.c_antonie2[2];
      }
      OBJETO.respuesta = nic(T_general);
    }
    if (met === 2) {
      ge_sol1 = OBJETO.wilson[4];
      ge_sol2 = OBJETO.wilson[5];

      peso_sol1 = OBJETO.wilson[2];
      peso_sol2 = OBJETO.wilson[3];

      v_molar1 = peso_sol1 / ge_sol1;
      v_molar2 = peso_sol2 / ge_sol2;

      dif_Lambda1 = OBJETO.wilson[0];
      dif_Lambda2 = OBJETO.wilson[1];

      lambda12 =
        (v_molar2 / v_molar1) *
        Math.exp((-1 * dif_Lambda1) / (r * (t + 273.15)));
      lambda21 =
        (v_molar1 / v_molar2) *
        Math.exp((-1 * dif_Lambda2) / (r * (t + 273.15)));

      for (let j = 0; j <= OBJETO.n; j++) {
        gama1 = Math.exp(
          -1 * Math.log(T_general[j][1] + lambda12 * T_general[j][4]) +
            T_general[j][4] *
              (lambda12 / (T_general[j][1] + lambda12 * T_general[j][4]) -
                lambda21 / (lambda21 * T_general[j][1] + T_general[j][4]))
        );
        gama2 = Math.exp(
          -1 * Math.log(T_general[j][4] + lambda21 * T_general[j][1]) -
            T_general[j][1] *
              (lambda12 / (T_general[j][1] + lambda12 * T_general[j][4]) -
                lambda21 / (lambda21 * T_general[j][1] + T_general[j][4]))
        );
        xa = peb1 * 0.2;
        xb = peb2 * 1.8;
        psup = (xa + xb) / 2;
        T_general[j][7] = 0;
        while (Math.abs(T_general[j][7] - 1) > 0.001) {
          psup = (xa + xb) / 2;
          T_general[j][3] = (gama1 * T_general[j][1] * peb1) / psup; //*Calculo de y2
          T_general[j][6] = (gama2 * T_general[j][4] * peb2) / psup; //*Calculo de y2
          T_general[j][7] = T_general[j][3] + T_general[j][6];
          if (T_general[j][7] > 1) {
            xa = psup;
          } else {
            xb = psup;
          }
        }
        T_general[j][0] = psup;
        T_general[j][2] =
          OBJETO.c_antonie1[1] /
            (OBJETO.c_antonie1[0] - Math.log(T_general[j][0])) -
          OBJETO.c_antonie1[2];
        T_general[j][5] =
          OBJETO.c_antonie2[1] /
            (OBJETO.c_antonie2[0] - Math.log(T_general[j][0])) -
          OBJETO.c_antonie2[2];
      }
      OBJETO.respuesta = nic(T_general);
    } else if (met === 3) {
      for (let j = 0; j <= OBJETO.n; j++) {
        gama1 = Math.exp(
          OBJETO.alpha12V[0] *
            Math.pow(
              (OBJETO.alpha21V[1] * T_general[j][4]) /
                (OBJETO.alpha12V[0] * T_general[j][1] +
                  OBJETO.alpha21V[1] * T_general[j][4]),
              2
            )
        );
        gama2 = Math.exp(
          OBJETO.alpha21V[1] *
            Math.pow(
              (OBJETO.alpha12V[0] * T_general[j][1]) /
                (OBJETO.alpha12V[0] * T_general[j][1] +
                  OBJETO.alpha21V[1] * T_general[j][4]),
              2
            )
        );
        xa = peb1 * 0.2;
        xb = peb2 * 1.8;
        psup = (xa + xb) / 2;
        T_general[j][7] = 0;
        while (Math.abs(T_general[j][7] - 1) > 0.001) {
          psup = (xa + xb) / 2;
          T_general[j][3] = (gama1 * T_general[j][1] * peb1) / psup; //*Calculo de y2
          T_general[j][6] = (gama2 * T_general[j][4] * peb2) / psup; //*Calculo de y2
          T_general[j][7] = T_general[j][3] + T_general[j][6];
          if (T_general[j][7] > 1) {
            xa = psup;
          } else {
            xb = psup;
          }
        }
        T_general[j][0] = psup;
        T_general[j][2] =
          OBJETO.c_antonie1[1] /
            (OBJETO.c_antonie1[0] - Math.log(T_general[j][0])) -
          OBJETO.c_antonie1[2];
        T_general[j][5] =
          OBJETO.c_antonie2[1] /
            (OBJETO.c_antonie2[0] - Math.log(T_general[j][0])) -
          OBJETO.c_antonie2[2];
      }
      OBJETO.respuesta = nic(T_general);
    }
  } else if (nombreConst === "Temperatura") {
    p = nombreGrado;
    T_general[OBJETO.n][0] =
      OBJETO.c_antonie1[1] / (OBJETO.c_antonie1[0] - Math.log10(p)) -
      OBJETO.c_antonie1[2];
    T_general[0][0] =
      OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[0] - Math.log10(p)) -
      OBJETO.c_antonie2[2];
    if (met === 1) {
      for (let i = 0; i <= OBJETO.n; i++) {
        //^ PARA QUE LA TEMPERATURA SE AJUSTE
        gama1 = Math.exp(
          (OBJETO.aplha12[0] +
            2 * (OBJETO.aplha21[1] - OBJETO.aplha12[0]) * T_general[i][1]) *
            Math.pow(T_general[i][4], 2)
        );
        gama2 = Math.exp(
          (OBJETO.aplha21[1] +
            2 * (OBJETO.aplha12[0] - OBJETO.aplha21[1]) * T_general[i][4]) *
            Math.pow(T_general[i][1], 2)
        );
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
          T_general[i][5] = Math.pow(
            10,
            OBJETO.c_antonie2[0] -
              OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[2] + tSup)
          ); //*Presiones de saturación especie 2
          T_general[i][3] = (gama1 * T_general[i][1] * T_general[i][2]) / p; //*Calculo de y1
          T_general[i][6] = (gama2 * T_general[i][4] * T_general[i][5]) / p; //*Calculo de y2
          T_general[i][7] = T_general[i][3] + T_general[i][6];
          if (T_general[i][7] > 1) {
            xb = tSup;
          } else {
            xa = tSup;
          }
        }
        T_general[i][0] = tSup;
      }
      OBJETO.respuesta = nic(T_general);
    }
    if (met === 2) {
      ge_sol1 = OBJETO.wilson[4];
      ge_sol2 = OBJETO.wilson[5];

      peso_sol1 = OBJETO.wilson[2];
      peso_sol2 = OBJETO.wilson[3];

      v_molar1 = peso_sol1 / ge_sol1;
      v_molar2 = peso_sol2 / ge_sol2;

      dif_Lambda1 = OBJETO.wilson[0];
      dif_Lambda2 = OBJETO.wilson[1];

      lambda12 =
        (v_molar2 / v_molar1) *
        Math.exp((-1 * dif_Lambda1) / (r * (t + 273.15)));
      lambda21 =
        (v_molar1 / v_molar2) *
        Math.exp((-1 * dif_Lambda2) / (r * (t + 273.15)));
      for (let j = 0; j <= 11; j++) {
        xa = T_general[11][0] * 0.2;
        xb = T_general[0][0] * 1.8;
        tSup = (xa + xb) / 2;
        T_general[j][7] = 0;
        while (Math.abs(T_general[j][7] - 1) > 0.001) {
          tSup = (xa + xb) / 2;
          T_general[j][2] = Math.pow(
            10,
            OBJETO.c_antonie1[0] -
              OBJETO.c_antonie1[1] / (OBJETO.c_antonie1[2] + tSup)
          );
          T_general[j][5] = Math.pow(
            10,
            OBJETO.c_antonie2[0] -
              OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[2] + tSup)
          );
          lambda12 =
            (v_molar2 / v_molar1) *
            Math.exp((-1 * dif_Lambda1) / (r * (tSup + 273.15)));
          lambda21 =
            (v_molar1 / v_molar2) *
            Math.exp((-1 * dif_Lambda2) / (r * (tSup + 273.15)));
          gama1 = Math.exp(
            -1 * Math.log(T_general[j][1] + lambda12 * T_general[j][4]) +
              T_general[j][4] *
                (lambda12 / (T_general[j][1] + lambda12 * T_general[j][4]) -
                  lambda21 / (lambda21 * T_general[j][1] + T_general[j][4]))
          );
          gama2 = Math.exp(
            -1 * Math.log(T_general[j][4] + lambda21 * T_general[j][1]) -
              T_general[j][1] *
                (lambda12 / (T_general[j][1] + lambda12 * T_general[j][4]) -
                  lambda21 / (lambda21 * T_general[j][1] + T_general[j][4]))
          );
          T_general[j][3] = (gama1 * T_general[j][1] * T_general[j][2]) / p;
          T_general[j][6] = (gama2 * T_general[j][4] * T_general[j][5]) / p;
          T_general[j][7] = T_general[j][3] + T_general[j][6];
          if (T_general[j][7] > 1) {
            xb = tSup;
          } else {
            xa = tSup;
          }
        }
        T_general[j][0] = tSup;
      }
      OBJETO.respuesta = nic(T_general);
    } else if (met === 3) {
      for (let i = 0; i <= OBJETO.n; i++) {
        //^ PARA QUE LA TEMPERATURA SE AJUSTE
        gama1 = Math.exp(
          OBJETO.alpha12V[0] *
            Math.pow(
              (OBJETO.alpha21V[1] * T_general[i][4]) /
                (OBJETO.alpha12V[0] * T_general[i][1] +
                  OBJETO.alpha21V[1] * T_general[i][4]),
              2
            )
        );
        gama2 = Math.exp(
          OBJETO.alpha21V[1] *
            Math.pow(
              (OBJETO.alpha12V[0] * T_general[i][1]) /
                (OBJETO.alpha12V[0] * T_general[i][1] +
                  OBJETO.alpha21V[1] * T_general[i][4]),
              2
            )
        );
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
          T_general[i][5] = Math.pow(
            10,
            OBJETO.c_antonie2[0] -
              OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[2] + tSup)
          ); //*Presiones de saturación especie 2
          T_general[i][3] = (gama1 * T_general[i][1] * T_general[i][2]) / p; //*Calculo de y1
          T_general[i][6] = (gama2 * T_general[i][4] * T_general[i][5]) / p; //*Calculo de y2
          T_general[i][7] = T_general[i][3] + T_general[i][6];
          if (T_general[i][7] > 1) {
            xb = tSup;
          } else {
            xa = tSup;
          }
        }
        T_general[i][0] = tSup;
      }
      OBJETO.respuesta = nic(T_general);
    }
  }
  return OBJETO;
}

function sitemaIdeal() {
  let OBJETO = {
    variable: nombreVar,
    gradoo: nombreGrado,
    bandera: 0,
    tipos: tipoS,
    n: 11,
    c_antonie1: OBJETOConstantesAntoine[nombreSis1],
    aplha12: OBJETOAlphaMargules[nombreSis1 + nombreSis2],
    aplha21: OBJETOAlphaMargules[nombreSis1 + nombreSis2],
    c_antonie2: OBJETOConstantesAntoine[nombreSis2],
    wilson: OBJETOAlphaWilson[nombreSis1 + nombreSis2],
    x1: x1(11),
    x2: x2(11),
    T_general: t_general(x1, x2, 11),
    //*ASI INVOCAS METODOS EN JAVASCRIPT -> NICOLE
    orquestador: orquestador,
    nic: nic,
    getnic: getnic,
    cambio: nombreCambio,
    getTipo: getTipo,
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
    //^ PRESION DE LA ESPECIE 2
    peb2 = Math.pow(
      10,
      OBJETO.c_antonie2[0] - OBJETO.c_antonie2[1] / (OBJETO.c_antonie2[2] + t)
    );

    for (let j = 0; j <= OBJETO.n; j++) {
      xa = peb1 * 0.2;
      xb = peb2 * 1.8;
      psup = (xa + xb) / 2;
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
      T_general[j][2] =
        OBJETO.c_antonie1[1] /
          (OBJETO.c_antonie1[0] - Math.log(T_general[j][0])) -
        OBJETO.c_antonie1[2];
      T_general[j][5] =
        OBJETO.c_antonie2[1] /
          (OBJETO.c_antonie2[0] - Math.log(T_general[j][0])) -
        OBJETO.c_antonie2[2];
    }
  } else if (nombreConst === "Temperatura") {
    //& SISTEMA IDEAL TEMPERATURA CONSTANTE
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
  }

  T_general[0][3] = 0;
  T_general[0][1] = 0;
  T_general[11][3] = 1;
  T_general[11][1] = 1;
  OBJETO.respuesta = nic(T_general);

  return OBJETO;
}

function getnic() {
  return respuesta;
}

function getTipo() {
  return tipoS;
}

function nic(T_general) {
  respuesta = [
    {
      x: T_general[0][0], //***Esto es Y y no cambia */
      y: T_general[0][3],
      x2: parseFloat(T_general[0][1]),
    },
    {
      x: T_general[1][0],
      y: T_general[1][3],
      x2: parseFloat(T_general[1][1]),
    },
    {
      x: T_general[2][0],
      y: T_general[2][3],
      x2: parseFloat(T_general[2][1]),
    },
    {
      x: T_general[3][0],
      y: T_general[3][3],
      x2: parseFloat(T_general[3][1]),
    },
    {
      x: T_general[4][0],
      y: T_general[4][3],
      x2: parseFloat(T_general[4][1]),
    },
    {
      x: T_general[5][0],
      y: T_general[5][3],
      x2: parseFloat(T_general[5][1]),
    },
    {
      x: T_general[7][0],
      y: T_general[7][3],
      x2: parseFloat(T_general[7][1]),
    },
    {
      x: T_general[8][0],
      y: T_general[8][3],
      x2: parseFloat(T_general[8][1]),
    },
    {
      x: T_general[9][0],
      y: T_general[9][3],
      x2: parseFloat(T_general[9][1]),
    },
    {
      x: T_general[10][0],
      y: T_general[10][3],
      x2: parseFloat(T_general[10][1]),
    },
    {
      x: parseFloat(T_general[11][0].toFixed(2)),
      y: T_general[11][3],
      x2: parseFloat(T_general[11][1]),
    },
    {
      x: 10000,
      y: 10000,
      x2: 10000,
    },
  ];

  var result = respuesta.map((n) => ({
    x: parseFloat(n.x.toFixed(2)),
    y: parseFloat(n.y.toFixed(2)),
    x2: parseFloat(n.x2.toFixed(2)),
  }));

  console.log(result);
  return result;
}

function x1(n) {
  var arreglo = [0],
    valorInicio = 0;
  while (valorInicio < 1) {
    var tF = (valorInicio += 1 / 11 || 1);
    arreglo.push(parseFloat(tF.toFixed(1)));
  }
  return arreglo;
}

function x2(n) {
  let arreglo = [1],
    valorInicio = 1;
  while (valorInicio > 0) {
    let tF = (valorInicio -= 1 / n || 1);
    arreglo.push(parseFloat(tF.toFixed(1)));
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
