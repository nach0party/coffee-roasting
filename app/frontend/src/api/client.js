import axios from "axios";

class ApiClient {
  // TOOD fix the baseURL
  constructor() {
    this.client = axios.create({
      baseURL: "http://10.0.0.199:8000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * How do we want to handle certain types of status codes / exceptions?
   * @param {*} request
   * @returns {response}
   */
  handleError = async (request) => {
    try {
      const response = await request;
      return response;
    } catch (error) {
      throw error;
    }
  };

  get = async (url, params = {}) => {
    return await this.handleError(this.client.get(url, { params: params }));
  };

  post = async (url, data = {}) => {
    return await this.handleError(this.client.post(url, data));
  };

  put = async (url, data = {}) => {
    return await this.handleError(this.client.put(url, data));
  };

  patch = async (url, data = {}) => {
    return await this.handleError(this.client.patch(url, data));
  };

  delete = async (url) => {
    return await this.handleError(this.client.delete(url));
  };
}

const apiClient = new ApiClient();
export default apiClient;
