import { Resource } from "./resource";

export class Origins extends Resource {
  get = async (id) => {
    return this.client.get(`/origins/${id}`);
  };

  list = async (params) => {
    return await this.client.get(`/origins`, params);
  };

  create = async (data) => {
    return await this.client.post(`/origins`, data);
  };

  /**
   * Provides some information on valid countires associated with origins.
   * @returns
   */
  countries = async () => {
    return await this.client.get(`/origins/countries`);
  };
}
