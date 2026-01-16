import { Beans } from './beans'
import { Origins } from './origins'

import { Roasts } from './roasts'
import { RoastEvents } from './roastEvents'
import { RoastProfiles } from './roastProfile'

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
    roastProfiles = new RoastProfiles()
}
    
const api = new CoffeeRoastingApi()
export default api 
