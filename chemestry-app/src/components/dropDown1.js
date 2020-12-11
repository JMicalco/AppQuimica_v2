import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import obj from "../clases/metodos";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "#e7e7e7",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [componente, setComponent] = React.useState("0");

  const handleChange = (event) => {
    setComponent(event.target.value);
    var x = event.target.value;
    switch (x) {
      case 1:
        obj.orquestador(10,"acetona","cloroformo","","","",10); 
        break;
      case 2:
        obj.orquestador(10,"acetona","metanol","","","",10);
        break;
      case 3:
        obj.orquestador(10,"acetona","agua060","","","",10);
        break;
      case 4:
        obj.orquestador(10,"tetracloruroDeCarbono","benceno","","","",10);
        break;
      case 5:
        obj.orquestador(10,"cloroformo","metanol","","","",10);
        break;
      case 6:
        obj.orquestador(10,"etanol","benceno","","","",10);
        break;
      case 7:
        obj.orquestador(10,"etanol","agua060","","","",10);
        break;
      case 8:
        obj.orquestador(10,"acetatodetilo","etanol","","","",10);
        break;
      case 9:
        obj.orquestador(10,"nHexano","etanol","","","",10);
        break;
      case 10:
        obj.orquestador(10,"metanol","benceno","","","",10);
        break;
      case 11:
        obj.orquestador(10,"metanol","acetatodetilo","","","",10);
      break;
      case 12:
        obj.orquestador(10,"metanol","agua060","","","",10);
        break;
      case 13:
        obj.orquestador(10,"acetatodemetilo","metanol","","","",10);
        break;
      case 14:
        obj.orquestador(10,"propanol1","agua060","","","",10);
        break;
      case 15:
        obj.orquestador(10,"propanol2","agua060","","","",10);
        break;
      case 16:
        obj.orquestador(10,"tetraHidrofurano","agua060","","","",10);
        break;
      case 17:
        obj.orquestador(10,"agua060","acidoAcetico","","","",10);
        break;
      case 18:
        obj.orquestador(10,"agua060","butanol1","","","",10);
        break;
      case 19:
        obj.orquestador(10,"agua060","acidoFormico","","","",10);
        break;
      default:
        obj.orquestador(10,"","","","","",10);
        break;
    }
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sistemas</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="menu"
          value={componente}
          onChange={handleChange}
          onClick={props.onChange}
          label="Sistemas"
          inputProps={{
            classes: {
              input: classes.multilineColor,
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Acetona - Cloroformo</MenuItem>
          <MenuItem value={2}>Acetona - Metanol</MenuItem>
          <MenuItem value={3}>Acetona - Agua</MenuItem>
          <MenuItem value={4}>Tetracloruro de Carbono - Benceno</MenuItem>
          <MenuItem value={5}>Cloroformo - Metanol</MenuItem>
          <MenuItem value={6}>Etanol - Benceno</MenuItem>
          <MenuItem value={7}>Etanol - Agua</MenuItem>
          <MenuItem value={8}>Acetado de etilo - Etanol</MenuItem>
          <MenuItem value={9}>N-Hexano - Etanol</MenuItem>
          <MenuItem value={10}>Metanol - Benceno</MenuItem>
          <MenuItem value={11}>Metanol - Acetato de etilo</MenuItem>
          <MenuItem value={12}>Metanol - Agua</MenuItem>
          <MenuItem value={13}>Acetato de metilo - Metanol</MenuItem>
          <MenuItem value={14}>1-Propanol - Agua</MenuItem>
          <MenuItem value={15}>2-Propanol - Agua</MenuItem>
          <MenuItem value={16}>TetraHidroFurano - Agua</MenuItem>
          <MenuItem value={17}>Agua - Ácido acético</MenuItem>
          <MenuItem value={18}>Agua - 1-Butanol</MenuItem>
          <MenuItem value={19}>Agua - Ácido fórmico</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
