import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import "./paginator.component.scss";

function PaginatorComponent({ page, perPage, total, changePagination }) {
  const pages = Math.ceil(total / perPage);
  const limit1 = page > 8 ? page - 5 : 1;
  const limit2 = page > 8 ? page + 5 : pages < 8 ? pages : 8;
  let tmpPages = [];
  for (var i = limit1; i <= limit2; i++) {
    tmpPages.push(i);
  }

  const changePage = page => changePagination(page);

  const prev = () => {
    if (page - 1 >= 1) changePage(page - 1);
  };

  const next = () => {
    if (page + 1 <= pages) changePage(page + 1);
  };

  return (
    <Grid container justify="center" alignItems="center" className="paginator">
      {page === 1 ? null : (
        <span className="paginator__page" onClick={() => prev()}>
          Anterior
        </span>
      )}
      {tmpPages.map(p => (
        <span
          key={p}
          className={
            p === page ? "paginator__page page-active" : "paginator__page"
          }
          onClick={() => changePage(p)}
        >
          {p}
        </span>
      ))}
      {pages === page ? null : (
        <span className="paginator__page" onClick={() => next()}>
          Siguiente
        </span>
      )}
    </Grid>
  );
}

PaginatorComponent.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  changePagination: PropTypes.func
};

export default PaginatorComponent;
