import { Beans } from './beans'
import { Origins } from './origins'
import { RoastEvents } from './roastEvents'
import { Roasts } from './roasts'

/**
 * Constructs and exposes the API ready to handle / 
 * retrieve information on behalf of the application.
 */
class CoffeeRoastingApi{
    
    // paths
    beans = new Beans()
    origins = new Origins()
    roasts = new Roasts()
    roastEvents = new RoastEvents()
}
    
const api = new CoffeeRoastingApi()
export default api 
