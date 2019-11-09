import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { condition } from "../../utils/condition";
import { currency } from "../../utils/currency";
import PicturesListComponent from "./pictures-list.component";
import Item from "../../api-resources/items";

class DetailsComponent extends Component {
  _isMounted = false;
  state = {
    picturesList: [],
    selectedPicture: null
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadPictures();
  }

  async loadPictures() {
    const { item } = this.props;
    const resp = await Item.urlParam("pictures").findById(item.id);
    if (this._isMounted)
      this.setState({
        ...this.state,
        picturesList: resp.pictures,
        selectedPicture: resp.pictures[0]
      });
  }

  selectImage(pic) {
    this.setState({
      ...this.state,
      selectedPicture: pic
    });
  }

  render() {
    const { item } = this.props;
    const { picturesList, selectedPicture } = this.state;
    return (
      <div className="details">
        <Grid
          container
          className="details__info"
          direction="row"
          justify="center"
        >
          <Grid item className="details__info__pictures">
            <PicturesListComponent
              picturesList={picturesList}
              selectedPicture={selectedPicture}
              onMouseEnter={pic => this.selectImage(pic)}
            />
          </Grid>
          <Grid item className="details__info__picture" xs>
            <Grid
              container
              alignContent="center"
              justify="center"
              className="details__info__picture__content"
            >
              {selectedPicture ? (
                <img src={selectedPicture.url} alt={selectedPicture.id} />
              ) : null}
            </Grid>
          </Grid>
          <Grid item xs={4} className="details__info__details">
            <span className="details__info__details__condition">
              {condition(item.condition)} - {`${item.sold_quantity} vendidos`}
            </span>
            <h1 className="title">{item.title}</h1>
            <div className="details__info__details__price">
              <span className="details__info__details__price__currency">
                {currency(item.price.currency)}
              </span>
              <span className="details__info__details__price__amount">
                {item.price.amount}
              </span>
              <span className="details__info__details__price__decimals">
                {item.price.decimals}
              </span>
            </div>
            <div variant="contained" className="details__info__details__button">
              <span>Comprar</span>
            </div>
          </Grid>
        </Grid>
        {item.description ? (
          <div className="details__info__description">
            <h1 className="title">Descripcion del producto</h1>
            <p>{item.description}</p>
          </div>
        ) : null}
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

DetailsComponent.propTypes = {
  item: PropTypes.object
};

export default DetailsComponent;
