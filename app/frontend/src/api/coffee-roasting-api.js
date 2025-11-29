import axios from 'axios'
import { Beans } from './beans'

/**
 * Constructs and exposes the API ready to handle / 
 * retrieve information on behalf of the application.
 */
class CoffeeRoastingApi{
    
    // paths
    beans = new Beans()
    roasts = null

    constructor(){
        console.log(this.test)
    }
    
}
    
const api = new CoffeeRoastingApi()
export default api 
