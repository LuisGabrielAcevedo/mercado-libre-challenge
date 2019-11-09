import React from "react";
import "./app-bar.component.scss";
import Grid from "@material-ui/core/Grid";
import SearchComponent from "./search.component";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/ml.png";

function AppBarComponent() {
  const history = useHistory();
  const search = value => {
    history.push({
      pathname: "/items",
      search: `?search=${value}`
    });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="app-tool-bar"
    >
      <Grid item xs={1}></Grid>
      <Grid item xs>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <img src={logo} alt={"ML"} className="app-tool-bar__logo" />
          </Grid>
          <Grid item xs>
            <SearchComponent searchAction={value => search(value)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default AppBarComponent;
