const axios = require("axios");

async function searchItems(value) {
  const items = await axios.get(
    `https://api.mercadolibre.com/sites/MLA/search?q=${value}&limit=4`
  );
  return items.data;
}

async function findItem(id) {
  const items = await axios.get(`https://api.mercadolibre.com/items/${id}`);
  return items.data;
}

async function findItemDescription(id) {
  const items = await axios.get(
    `https://api.mercadolibre.com/items/${id}/description`
  );
  return items.data;
}

function formatItem(item) {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount:
        item.price % 1 == 0 ? item.price : +item.price.toString().split(".")[0],
      decimals: item.price % 1 == 0 ? 0 : +item.price.toString().split(".")[1]
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
  formatCategories
};
