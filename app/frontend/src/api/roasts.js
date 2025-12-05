import { Resource } from './resource'

export class Roasts extends Resource {

    get = async (id) => {
        return this.client.get(`/roasts/${id}`)
    }

    list = async (params) => {
        return await this.client.get(`/roasts`, params)
    }
    
    create = async (data) => {
        return await this.client.post(`/roasts`, data)
    }

    beginRoast = async (id) => {
        return await this.client.post(`/roasts/${id}/begin`)
    }

    endRoast = async (id) => {
        return await this.client.post(`/roasts/${id}/end`)
    }

    delete = async (id) => {
        return await this.client.delete(`/roasts/${id}`)
    }
}