import { Resource } from './resource'

export class RoastEvents extends Resource {

    get = async (id) => {
        return this.client.get(`/roast/events/${id}`)
    }

    list = async (params) => {
        return await this.client.get(`/roasts/events`, params)
    }
    
    create = async (data) => {
        return await this.client.post(`/roasts/events`, data)
    }

}