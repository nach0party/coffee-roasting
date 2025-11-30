import apiClient from "./client"

/***
 * Works to be the default implementation of how we connect to the roasting API.
 * Since js doesn't have abstract base classes we'll throw a little extra coding 
 * in here to force implementation.
 */
export class Resource {

    client = apiClient

    get = async () => {
        throw Error('get must be implemented')
    }

    list = async () => {
        throw Error('list must be implemented')
    }

    create = async () => {
        throw Error('create must be implemented')
    }

    delete = async () => {
        throw Error('delete must be implemented')
    }

    partialUpdate = async () => {
        throw Error('partialUpdate must be implemented')
    }

}