const MLApiService = require("../services/mercado-libre-api.service");
const config = require("../config");

async function getItems(req, res) {
  try {
    // 1. Search item req.query.q
    const resp = await MLApiService.searchItems(req.query.q);
    // 2 Format categories
    const formattedCategories = MLApiService.formatCategories(resp);
    // 3. Format items
    const formattedItems = resp.results
      ? resp.results.map(item => {
          const formattedItem = MLApiService.formatItem(item);
          // 4. Set Location
          formattedItem.location = {
            state_name: item.address.state_name,
            state_id: item.address.state_id
          };
          return formattedItem;
        })
      : [];
    // 5. End response
    const formattedResp = {
      author: config.author,
      categories: formattedCategories,
      items: formattedItems
    };
    // 6. Send response
    res.status(200).send(formattedResp);
  } catch (e) {
    return res.status(500).send({ mgs: "Server error" });
  }
}

async function findItem(req, res) {
  try {
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
  } catch (e) {
    return res.status(500).send({ mgs: "Server error, item not found" });
  }
}

module.exports = {
  getItems,
  findItem
};
