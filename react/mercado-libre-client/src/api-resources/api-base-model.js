import { Model } from "lgx-axios-dev-tools";

export default class MercadoLibreApiBaseModel extends Model {
  baseUrl() {
    //return "http://localhost:4000/api";
    return "https://ml-node-api.herokuapp.com/api";
  }
}
