import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";

function SearchComponent({ searchAction }) {
  const input = React.useRef(null);

  const search = event => {
    if (event.key === "Enter" && event.target.value)
      searchAction(event.target.value);
  };

  const searchFromIcon = () => {
    if (input.current.firstChild.value)
      searchAction(input.current.firstChild.value);
  };

  return (
    <Paper className="search">
      <InputBase
        ref={input}
        className="search__input"
        placeholder="Nunca dejes de buscar"
        onKeyPress={e => search(e)}
      />
      <Divider orientation="vertical" />
      <Icon className="search__icon" onClick={() => searchFromIcon()}>
        search
      </Icon>
    </Paper>
  );
}

SearchComponent.propTypes = {
  searchAction: PropTypes.func
};

export default SearchComponent;
