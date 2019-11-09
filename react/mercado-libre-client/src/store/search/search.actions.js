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

const setItemDescriptionAction = data => {
  return {
    type: SET_ITEM_DESCRIPTION,
    payload: data
  };
};

const searchItemsAction = data => {
  return async dispatch => {
    dispatch(startSearchItemsAction(data.value));
    const resp = await Items.page(data.page)
      .perPage(data.perPage)
      .option("q", data.value)
      .find();
    try {
      dispatch(
        setItemsAction({
          items: resp.items,
          categories: resp.categories,
          pagination: resp.pagination
        })
      );
    } catch (e) {
      dispatch(setItemsAction({ items: [], categories: [], pagination: null }));
    }
  };
};

const searchItemDescriptionAction = id => {
  return async dispatch => {
    dispatch(startSearchItemDescriptionAction());
    try {
      const resp = await Items.findById(id);
      dispatch(
        setItemDescriptionAction({
          item: resp.item,
          categories: [resp.item.category]
        })
      );
    } catch (e) {
      dispatch(setItemDescriptionAction({ item: null, categories: [] }));
    }
  };
};

export { searchItemsAction, searchItemDescriptionAction };
