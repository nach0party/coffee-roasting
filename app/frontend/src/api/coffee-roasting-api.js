import { Beans } from "./beans";
import { Origins } from "./origins";

import { Roasts } from "./roasts";
import { RoastEvents } from "./roastEvents";
import { RoastProfiles } from "./roastProfile";
import { RoastProfileFlavors } from "./roastProfileFlavors";
import { RoastFlavors } from "./roastFlavors";

/**
 * Constructs and exposes the API ready to handle /
 * retrieve information on behalf of the application.
 */
class CoffeeRoastingApi {
  // paths
  beans = new Beans();
  origins = new Origins();
  roasts = new Roasts();
  roastFlavors = new RoastFlavors();
  roastEvents = new RoastEvents();
  roastProfiles = new RoastProfiles();
  roastProfileFlavors = new RoastProfileFlavors();
}

const api = new CoffeeRoastingApi();
export default api;
