const axios = require("axios");
const config = require("../config");

async function searchItems(query) {
  const offset = (query.page - 1) * query.perPage;
  const resp = await axios.get(
    `${config.urlBase}/sites/MLA/search?q=${query.q}&limit=${query.perPage}&offset=${offset}`
  );
  return resp.data;
}

async function findItem(id) {
  const resp = await axios.get(`${config.urlBase}/items/${id}`);
  return resp.data;
}

async function findItemDescription(id) {
  const resp = await axios.get(`${config.urlBase}/items/${id}/description`);
  return resp.data;
}

async function getCategory(id) {
  const resp = await axios.get(`${config.urlBase}/categories/${id}`);
  return resp.data;
}

function formatItem(item) {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount:
        item.price % 1 == 0 ? item.price : +item.price.toString().split(".")[0],
      decimals:
        item.price % 1 == 0 ? null : +item.price.toString().split(".")[1]
    },
    picture: item.pictures ? item.pictures[0].url : item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    sold_quantity: item.sold_quantity
  };
}

function formatCategories(resp) {
  // 1. Search categories
  const selectCategoryFilter = resp.available_filters.find(
    filter => filter.id === "category"
  );
  // 2. Sort categories
  const categories = selectCategoryFilter
    ? selectCategoryFilter.values.sort((a, b) => b.results - a.results)
    : [];
  // 3. Format categories
  return categories.map(c => c.name);
}

module.exports = {
  searchItems,
  findItem,
  findItemDescription,
  formatItem,
  formatCategories,
  getCategory
};
