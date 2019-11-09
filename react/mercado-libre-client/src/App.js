import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
  AppBarComponent,
  BreadcrumbComponent
} from "./components/common/common.index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
// Lazy loading routes
import AppRoutes from "./App.routes";

function App({ searchState }) {
  return (
    <div className="app">
      <BrowserRouter>
        <AppBarComponent />
        <React.Suspense fallback={null}>
          <Grid container justify="center" alignItems="center" className="app">
            <Grid item xs={10}>
              <div className="app__content">
                <BreadcrumbComponent categories={searchState.categories} />
                <Switch>
                  {AppRoutes.map((route, i) => {
                    return route.component ? (
                      <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={route.component}
                      />
                    ) : null;
                  })}
                </Switch>
              </div>
            </Grid>
          </Grid>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    searchState: state.search
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
