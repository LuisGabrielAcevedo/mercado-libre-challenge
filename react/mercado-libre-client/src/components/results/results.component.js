import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { searchItemsAction } from "../../store/search/search.actions";
import { parse } from "query-string";
import "./results.component.scss";
import CardComponent from "./card.component";
import { LoadingComonent, AlertComponent } from "../common/common.index";

class ResultsComponent extends Component {
  componentDidMount() {
    this.searchItemsFn();
  }

  componentDidUpdate(nextProps) {
    const { location } = this.props;
    if (location !== nextProps.location) this.searchItemsFn();
  }

  searchItemsFn() {
    const { location, searchItems } = this.props;
    const queryData = parse(location.search);
    searchItems(queryData.search);
  }

  render() {
    const { searchState } = this.props;
    const items = searchState.items;
    const loading = searchState.loading;
    return (
      <div className="results">
        {loading ? (
          <LoadingComonent />
        ) : items.length ? (
          items.map((item, i) => <CardComponent key={i} item={item} />)
        ) : (
          <AlertComponent
            message={"No hay publicaciones que coincidan con tu búsqueda"}
          />
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
    searchItems: value => dispatch(searchItemsAction(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResultsComponent));
