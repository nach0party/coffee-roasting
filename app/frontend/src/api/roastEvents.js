import { Resource } from "./resource";

export class RoastEvents extends Resource {
  get = async (id) => {
    return this.client.get(`/roast/events/${id}`);
  };

  list = async (params) => {
    return await this.client.get(`/roasts/events`, params);
  };

  partialUpdate = async (id, data) => {
    return await this.client.patch(`/roasts/events/${id}`, data);
  };

  // TODO I think we need a "swap" event where the start is the same time as the end_time of the last event...
  create = async (data) => {
    return await this.client.post(`/roasts/events`, data);
  };
}
