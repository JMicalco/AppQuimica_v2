import React from "react";
import "../App.css";

class Button extends React.Component {
  render() {
    return (
      <button
        className="btn btn-outline"
        onClick={this.props.onClick}
        value={this.props.name}
      >
        {this.props.name}
      </button>
    );
  }
}

export default Button;
