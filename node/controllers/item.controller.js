const MLApiService = require("../services/mercado-libre-api.service");
const config = require("../config");

async function getItems(req, res) {
  // 1. Search item req.query.q
  const resp = await MLApiService.searchItems(req.query.q);
  // 2 Format categories
  const formattedCategories = MLApiService.formatCategories(resp);
  // 3. Format items
  const formattedItems = resp.results.map(item =>
    MLApiService.formatItem(item)
  );
  // 4. End response
  const formattedResp = {
    author: config.author,
    categories: formattedCategories,
    items: formattedItems
  };
  // 5. Send response
  res.status(200).send(formattedResp);
}

async function findItem(req, res) {
  // 1. Search item details and description
  const resp = await Promise.all([
    MLApiService.findItem(req.params.id),
    MLApiService.findItemDescription(req.params.id)
  ]);
  // 2. Format item
  const formattedItem = MLApiService.formatItem(resp[0]);
  // 3. Set description
  formattedItem.description = resp[1].plain_text;
  // 4. End response
  const formattedResp = {
    author: config.author,
    item: formattedItem
  };
  // 5. Send response
  res.status(200).send(formattedResp);
}

module.exports = {
  getItems,
  findItem
};
