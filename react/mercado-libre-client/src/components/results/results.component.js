import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { searchItemsAction } from "../../store/search/search.actions";
import { parse } from "query-string";
import "./results.component.scss";
import CardComponent from "./card.component";
import {
  LoadingComonent,
  AlertComponent,
  PaginatorComponent
} from "../common/common.index";

class ResultsComponent extends Component {
  componentDidMount() {
    this.searchItemsFn();
  }

  componentDidUpdate(nextProps) {
    const { location } = this.props;
    if (location !== nextProps.location) this.searchItemsFn();
  }

  searchItemsFn(page) {
    const { location, searchItems } = this.props;
    const queryData = parse(location.search);
    searchItems({
      value: queryData.search,
      page: page || 1,
      perPage: 4
    });
  }

  render() {
    const { searchState } = this.props;
    return (
      <div className="results">
        {searchState.loading ? (
          <LoadingComonent />
        ) : searchState.items.length ? (
          <div>
            {searchState.items.map((item, i) => (
              <CardComponent key={i} item={item} />
            ))}
            <PaginatorComponent
              page={searchState.pagination.page}
              total={searchState.pagination.total}
              perPage={searchState.pagination.perPage}
              changePagination={page => this.searchItemsFn(page)}
            />
          </div>
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
    searchItems: data => dispatch(searchItemsAction(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResultsComponent));
