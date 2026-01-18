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

  getSuggestions = async () => {
    return await this.client.post(`/roasts/profiles/flavors/suggestions`);
  };

  getAnalytics = async (params) => {
    return await this.client.post(`/roasts/profiles/flavors/analytics`, params);
  };
}
