import React from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function BreadcrumbComponent({ categories }) {
  return (
    <Breadcrumbs maxItems={2}>
      {categories.map((category, i) => (
        <Link key={i} color="inherit">
          {category}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

BreadcrumbComponent.propsTypes = {
  categories: PropTypes.array
};

export default BreadcrumbComponent;
