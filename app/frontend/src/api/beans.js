import { Resource } from './resource'

export class Beans extends Resource {

    get = async (id) => {
        return this.client.get(`/beans/${id}`)
    }

    list = async () => {
        return await this.client.get(`/beans`)
    }

}