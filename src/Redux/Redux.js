
import { createStore, combineReducers } from "redux";
import PhotosReduser from "./RoverPhotos";

let Redusers= combineReducers({
 PhotosPage:PhotosReduser
})
const store =createStore(
  Redusers
)
window.store = store;
export default store