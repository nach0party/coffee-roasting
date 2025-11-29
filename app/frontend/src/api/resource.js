import apiClient from "./client"

/***
 * Works to be the default implementation of how we connect to the roasting API.
 * Since js doesn't have abstract base classes we'll throw a little extra coding in here to force implementation.
 */
export class Resource {

    client = apiClient

    constructor() {

    }

    get = async () => {
        throw Error('get must be implemented')
    }

    list = async () => {
        throw Error('get must be implemented')
    }

    create = async () => {
        throw Error('get must be implemented')
    }

    delete = async () => {
        throw Error('get must be implemented')
    }

    // TODO I don't care to implement PUT
    partialUpdate = async () => {
        throw Error('get must be implemented')
    }

}