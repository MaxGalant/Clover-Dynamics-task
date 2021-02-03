
const SET_PHOTOS = "RoverPhotos/SET_PHOTOS";


let InitialState={
  Photos:[],
  lpStatus:"201"
}
const PhotosReduser=(State=InitialState,action)=>{
    switch (action.type){
      case SET_PHOTOS:{
        return{
          ...State,
          Photos: action.photos
        }
      
      }
    default: return State
    }
}
export let setPhotos=(photos)=>{
  return{
    type:SET_PHOTOS,
    photos
  }
}
export default PhotosReduser