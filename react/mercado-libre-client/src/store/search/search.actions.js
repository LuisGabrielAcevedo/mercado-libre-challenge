import Items from "../../api-resources/items";
export const SEARCH_ITEMS = "[Search] Search items";
export const SET_ITEMS = "[Search] Set Search items";
export const SEARCH_ITEM_DESCRIPTION = "[Search] Search item description";
export const SET_ITEM_DESCRIPTION = "[Search] Set item description";

const startSearchItemsAction = value => {
  return {
    type: SEARCH_ITEMS,
    payload: value
  };
};

const setItemsAction = data => {
  return {
    type: SET_ITEMS,
    payload: data
  };
};

const startSearchItemDescriptionAction = () => {
  return {
    type: SEARCH_ITEM_DESCRIPTION
  };
};

const setItemDescriptionAction = item => {
  return {
    type: SET_ITEM_DESCRIPTION,
    payload: item
  };
};

const searchItemsAction = value => {
  return async dispatch => {
    dispatch(startSearchItemsAction(value));
    const resp = await Items.option("q", value).find();
    try {
      dispatch(
        setItemsAction({ items: resp.items, categories: resp.categories })
      );
    } catch (e) {
      dispatch(setItemsAction({ items: [], categories: [] }));
    }
  };
};

const searchItemDescriptionAction = id => {
  return async dispatch => {
    dispatch(startSearchItemDescriptionAction());
    try {
      const resp = await Items.findById(id);
      dispatch(setItemDescriptionAction(resp.item));
    } catch (e) {
      dispatch(setItemDescriptionAction(null));
    }
  };
};

export { searchItemsAction, searchItemDescriptionAction };
