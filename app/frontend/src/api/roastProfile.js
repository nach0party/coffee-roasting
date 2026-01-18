import { Resource } from "./resource";

export class RoastProfiles extends Resource {
  get = async (id) => {
    return this.client.get(`/roast/profiles/${id}`);
  };

  list = async (params) => {
    return await this.client.get(`/roasts/profiles`, params);
  };

  partialUpdate = async (id, data) => {
    return await this.client.patch(`/roasts/profiles/${id}`, data);
  };

  create = async (data) => {
    return await this.client.post(`/roasts/profiles`, data);
  };
}
