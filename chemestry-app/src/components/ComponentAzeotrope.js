import React from "react";
import obj from "../clases/metodos";
let a=[];
var cordenadas="";

const onSegment=(arreglo, arreglo2, arreglo3, arreglo4, arreglo5, arreglo6)=>{
  if (arreglo3 <= Math.max(arreglo, arreglo5) && arreglo3 >= Math.min(arreglo, arreglo5) && 
	    		arreglo4 <= Math.max(arreglo2, arreglo6) && arreglo4 >= Math.min(arreglo2, arreglo6)) 
      return true; 
      
      return false; 
};

const orientation=(arreglo, arreglo2, arreglo3, arreglo4, arreglo5, arreglo6)=>{
  let val = (arreglo4 - arreglo2) * (arreglo5 - arreglo3) - (arreglo3 - arreglo) * (arreglo6 - arreglo4); 
	  
  if (val == 0) return 0; // colinear 

  return (val > 0)? 1: 2; // clock or counterclock wise 
};

const doIntersect=((arreglo, arreglo2, arreglo3, arreglo4, arreglo5, arreglo6, arreglo7, arreglo8)=>{
  let o1 = orientation(arreglo,arreglo2,arreglo3,arreglo4, arreglo5,arreglo6); 
  let o2 = orientation(arreglo,arreglo2, arreglo3,arreglo4, arreglo7, arreglo8); 
  let o3 = orientation(arreglo5,arreglo6, arreglo7, arreglo8, arreglo,arreglo); 
  let o4 = orientation(arreglo5,arreglo6, arreglo7, arreglo8, arreglo3,arreglo4); 

  // General case 
  if (o1 != o2 && o3 != o4) {
    getIntersect(arreglo,arreglo2,arreglo3,arreglo4,arreglo5,arreglo6,arreglo7,arreglo8);
  }
});

const getIntersect=(arreglo,arreglo2,arreglo3,arreglo4,arreglo5,arreglo6,arreglo7,arreglo8)=>{
  let a1 = arreglo4-arreglo2;		//B.y - A.y; 
  let b1 = arreglo-arreglo3;		//A.x - B.x; 
  let c1 = a1*arreglo+b1*arreglo2;	//a1*(A.x) + b1*(A.y); 
 
  // Line CD represented as a2x + b2y = c2 
  let a2 = arreglo8-arreglo6;		//D.y - C.y; 
  let b2 = arreglo5-arreglo7;		//C.x - D.x; 
  let c2 = a2*arreglo5+b2*arreglo6;	//a2*(C.x)+ b2*(C.y); 
 
  let determinant = a1*b2 - a2*b1; 
  let x = ((b2*c1 - b1*c2)/determinant).toFixed(2); 
  let y = Math.trunc((a1*c2 - a2*c1)/determinant); 

  a.push(x);
  a.push(y);
};

const printList =(x, y, prevX, prevY)=>{
  if(x<a.size()) {
    let temp1,temp2;
    temp1=a.get(x);
    temp2=a.get(y);
    if(!(temp1.equals(prevX))&&!(temp2.equals(prevY))) {
      console.log("EJE X= "+temp1+ " EJE Y= "+ temp2);
      cordenadas+="EJE X= "+temp1+ " EJE Y= "+ temp2+"\n";
      printList(x=x+2,y=y+2,temp1,temp2);
    }else {
      printList(x=x+2,y=y+2,temp1,temp2);
    }
  }
};



const points=()=>{
  let arreglo = obj.getnic();
  for(let x=0;x<arreglo.length-3;x++) {
    for(let y=1;y<arreglo.length-2;y++) {
      doIntersect(arreglo[y].y,arreglo[y].x,arreglo[y+1].y,arreglo[y+1].x,arreglo[x].y,arreglo[x].x2,arreglo[x+1].y,arreglo[x+1].x2);
    }
  }

  printList(0,1,1000,1000);
  

};

const nine = () => {
  return (
    <div className="nine" onChange={points}>
      <h2>Azeótropo</h2>
      <hr></hr>
      <h5 className="h5-align">¿Existe?:  </h5>
      <h5 className="h5-align">Coordenadas: {cordenadas} </h5>
      <h5 className="h5-align"> Tipo de Azeótropo: </h5>
    </div>
  );
};

export default nine;
