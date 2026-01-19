import { Resource } from "./resource";

export class RoastProfileFlavors extends Resource {
  get = async (id) => {
    return this.client.get(`/roast/profiles/flavors/${id}`);
  };

  list = async (params) => {
    return await this.client.get(`/roasts/profiles/flavors`, params);
  };

  create = async (data) => {
    return await this.client.post(`/roasts/profiles/flavors`, data);
  };

  partialUpdate = async (id, data) => {
    return await this.client.patch(`/roasts/profiles/flavors/${id}`, data);
  };

  delete = async (id) => {
    return await this.client.delete(`/roasts/profiles/flavors/${id}`);
  };

  getAnalytics = async (params) => {
    return await this.client.post(`/roasts/profiles/flavors/analytics`, params);
  };
}
