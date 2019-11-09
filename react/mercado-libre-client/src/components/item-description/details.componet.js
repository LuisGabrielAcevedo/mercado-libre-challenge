import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { condition } from "../../utils/condition";
import { currency } from "../../utils/currency";

function DetailsComponent({ item }) {
  return (
    <div className="details">
      <Grid container direction="row" justify="center">
        <Grid item className="details__image-content" xs>
          <img src={item.picture} alt={item.picture} />
        </Grid>
        <Grid item xs={4} className="details__content">
          <span className="details__condition">
            {condition(item.condition)} - {`${item.sold_quantity} vendidos`}
          </span>
          <h1 className="title">{item.title}</h1>
          <div className="details__price">
            <span className="details__price__currency">
              {currency(item.price.currency)}
            </span>
            <span className="details__price__amount">{item.price.amount}</span>
            <span className="details__price__decimals">
              {item.price.decimals}
            </span>
          </div>
          <div variant="contained" className="details__button">
            <span>Comprar</span>
          </div>
        </Grid>
      </Grid>
      {item.description ? (
        <div className="details__description">
          <h1 className="title">Descripcion del producto</h1>
          <p>{item.description}</p>
        </div>
      ) : null}
    </div>
  );
}

DetailsComponent.propTypes = {
  item: PropTypes.object
};

export default DetailsComponent;
