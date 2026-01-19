import { Resource } from "./resource";

export class RoastFlavors extends Resource {
  get = async (id) => {
    return this.client.get(`/roast/flavors/${id}`);
  };

  list = async (params) => {
    return await this.client.get(`/roasts/flavors`, params);
  };

  create = async (data) => {
    return await this.client.post(`/roasts/flavors`, data);
  };
}
