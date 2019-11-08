import React from "react";

const ResultsComponent = React.lazy(() =>
  import("./components/results/results.component")
);
const ItemDescriptionComponent = React.lazy(() =>
  import("./components/item-description/item-description.component")
);

const AppRoutes = [
  {
    path: "/items",
    exact: true,
    name: "results",
    component: ResultsComponent
  },
  {
    path: "/items/:id",
    exact: true,
    name: "description",
    component: ItemDescriptionComponent
  }
];

export default AppRoutes;
