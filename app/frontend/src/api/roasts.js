import { Resource } from './resource'

export class Roasts extends Resource {

    get = async (id) => {
        return this.client.get(`/roasts/${id}`)
    }

    list = async () => {
        return await this.client.get(`/roasts`)
    }
    
    create = async (data) => {
        return await this.client.post(`/roasts`, data)
    }

    beginRoast = async (id) => {
        return await this.client.post(`/roasts/${id}/begin`)
    }
}