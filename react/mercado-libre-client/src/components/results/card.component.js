import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { currency } from "../../utils/currency";

function CardComponent({ item }) {
  const history = useHistory();
  return (
    <div className="card" onClick={() => history.push(`/items/${item.id}`)}>
      <Grid container>
        <Grid item className="card__image">
          <img src={item.picture} alt={item.picture} />
        </Grid>
        <Grid item xs className="card__description">
          <span className="card__description__currency">
            {currency(item.price.currency)}
          </span>
          <span className="card__description__price">{item.price.amount}</span>
          {item.price.decimals ? (
            <span className="card__description__decimals">
              {item.price.decimals}
            </span>
          ) : null}
          <p className="card__description__title">{item.title}</p>
        </Grid>
        <Grid item xs={4} className="card__location">
          <Grid container alignContent="center" justify="center">
            <span>{item.location.state_name}</span>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

CardComponent.propTypes = {
  item: PropTypes.object
};

export default CardComponent;
