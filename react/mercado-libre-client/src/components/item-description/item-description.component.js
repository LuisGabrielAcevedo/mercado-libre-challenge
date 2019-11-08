import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { searchItemDescriptionAction } from "../../store/search/search.actions";
import DetailsComponent from "./details.componet";
import "./item-description.component.scss";
import LoadingComonent from "../common/loading/loading.component";

class ItemDescriptionComponent extends Component {
  componentDidMount() {
    this.searchItemDescriptionFn();
  }

  searchItemDescriptionFn() {
    const { match, searchItemDescription } = this.props;
    const id = match.params.id;
    searchItemDescription(id);
  }

  render() {
    const { searchState } = this.props;
    const item = searchState.selectedItem;
    const loading = searchState.loading;
    return (
      <div className="description">
        {loading ? (
          <LoadingComonent />
        ) : item ? (
          <DetailsComponent item={item} />
        ) : (
          <div>Item no encontrado</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchState: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchItemDescription: id => dispatch(searchItemDescriptionAction(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemDescriptionComponent));
