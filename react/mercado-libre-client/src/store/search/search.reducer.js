import * as SearchActions from "./search.actions";

const initialState = {
  value: null,
  loading: false,
  items: [],
  pagination: null,
  selectedItem: null,
  categories: []
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SearchActions.SEARCH_ITEMS:
      return {
        ...state,
        loading: true,
        value: action.payload,
        categories: [],
        pagination: null
      };
    case SearchActions.SET_ITEMS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        categories: action.payload.categories,
        pagination: action.payload.pagination
      };
    case SearchActions.SEARCH_ITEM_DESCRIPTION:
      return { ...state, loading: true };
    case SearchActions.SET_ITEM_DESCRIPTION:
      return {
        ...state,
        loading: false,
        selectedItem: action.payload.item,
        categories: action.payload.categories
      };
    default:
      return state;
  }
};

export default SearchReducer;
