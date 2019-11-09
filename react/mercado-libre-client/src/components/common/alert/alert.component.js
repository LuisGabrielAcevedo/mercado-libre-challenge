import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import "./alert.component.scss";
import image from "../../../assets/warn.png";

function AlertComponent({ message }) {
  return (
    <Grid container justify="center" alignItems="center" className="alert">
      <Grid item xs={4}>
        <img src={image} alt="warn" />
      </Grid>
      <Grid item xs>
        <p className="title">{message}</p>
      </Grid>
    </Grid>
  );
}

AlertComponent.propTypes = {
  message: PropTypes.string
};

export default AlertComponent;
