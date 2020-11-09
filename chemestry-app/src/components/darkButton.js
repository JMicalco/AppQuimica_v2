import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[100],
    },
    "&$checked + $track": {
      backgroundColor: purple[100],
    },
  },
  checked: {},
  track: {},
})(Switch);

var controlador = 1;

export default function CustomizedSwitches() {
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    if (controlador === 1) {
      setState(
        { ...state, [event.target.name]: event.target.checked },
        (document.body.style.backgroundColor = "#3f3f3f")
      );
      controlador = 0;
    } else {
      setState(
        { ...state, [event.target.name]: event.target.checked },
        (document.body.style.backgroundColor = "#ffffff")
      );
      controlador = 1;
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <PurpleSwitch
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label="Dark Mode"
      />
    </FormGroup>
  );
}
