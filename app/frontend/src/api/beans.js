import { Resource } from './resource'

export class Beans extends Resource {

    get = async (id) => {
        return this.client.get(`/beans/${id}`)
    }

    list = async (params) => {
        return await this.client.get(`/beans`, params)
    }
    
    create = async (data) => {
        return await this.client.post(`beans`, data)
    }

    partialUpdate = async (id, data) => {
        return await this.client.patch(`beans/${id}`, data)
    }

}