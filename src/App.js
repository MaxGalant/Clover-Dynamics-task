import s from "./App.module.scss";
import Curiosity from "./Img/curiosity.jpg";
import Opportunity from "./Img/Opportunity.jpg";
import Spirit from "./Img/Spirit.jpg";
import Axios from "axios";
import { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Photo from "./Components/Photo";

function App(props) {
  const [photos, setPhotos] = useState([]);
  const [Length, setLength] = useState(4);
  function chooseRover(e) {
    let SelectedRover = document.getElementById("SelectedRover");
    let RoverImg = document.getElementById("RoverImg");
    let RoverName = document.getElementById("RoverName");
    let RoverBlock = document.getElementById("RoverBlock");
    let target = e.currentTarget;
    let ParentArray = target.parentElement.children;
    RoverImg.src = ParentArray[0].src;
    RoverName.innerHTML = ParentArray[1].innerHTML;
    RoverBlock.style.display = "none";
    SelectedRover.style.display = "grid";
  }
  function change() {
    setPhotos([]);
    let load = document.getElementById("Load");
    let block = document.getElementById("PhotosBlock");
    load.style.display = "none";
    block.style.display = "none";
  }
  function roverReturn() {
    let load = document.getElementById("Load");
    let camera = document.getElementById("camera");
    let sol = document.getElementById("solInput");
    let SelectedRover = document.getElementById("SelectedRover");
    let RoverBlock = document.getElementById("RoverBlock");
    let block = document.getElementById("PhotosBlock");
    let photoError = document.getElementById("Error");
    camera.value = "None";
    sol.value = "";
    load.style.display = "none";
    block.style.display = "none";
    photoError.style.display = "none";
    SelectedRover.style.display = "none";
    RoverBlock.style.display = "grid";
    setPhotos([]);
  }
  function loadMore() {
    setLength(Length + 4);
    console.log(Length);
    if (Length + 4 > photos.length) {
      let load = document.getElementById("Load");
      load.style.display = "none";
    }
  }
  function SendRequest() {
    let block = document.getElementById("PhotosBlock");
    let photoError1 = document.getElementById("Error1");
    let photoError2 = document.getElementById("Error2");
    let photoError3 = document.getElementById("Error3");
    let name = document.getElementById("RoverName");
    let camera = document.getElementById("camera");
    let sol = document.getElementById("solInput");
    let load = document.getElementById("Load");

    if (camera.value !== "None") {
      if (!isNaN(sol.value)) {
        Axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${
            name.innerHTML
          }/photos?sol=${Number.parseInt(sol.value)}&camera=${
            camera.value
          }&api_key=rHOBuDjqX5lc2JJc2TDc2nJBc2hZbT08qNXlb0Gv`
        ).then((Response) => {
          setPhotos(Response.data.photos);
          if (Response.data.photos.length > 4) {
            load.style.display = "grid";
          }
          if (Response.data.photos.length > 0) {
            photoError1.style.display = "none";
            photoError2.style.display = "none";
            photoError3.style.display = "none";
            block.style.display = "inline";
          } else {
            block.style.display = "none";
            photoError2.style.display = "none";
            photoError3.style.display = "none";
            photoError1.style.display = "inline";
          }
        });
      } else {
        block.style.display = "none";
        photoError2.style.display = "inline";
        photoError1.style.display = "none";
        photoError3.style.display = "none";
      }
    } else {
      block.style.display = "none";
      photoError1.style.display = "none";
      photoError2.style.display = "none";
      photoError3.style.display = "inline";
    }
  }
  let newArray = photos.slice(0, Length);
  let Photos = newArray.map((p) => <Photo key={p.id} src={p.img_src} />);
  return (
    <div className={s.App}>
      <div className={s.MarsTheme}></div>
      <div className={s.RoverBlockContainer} id="RoverBlock">
        <div className={s.RoverBlockTitle}>
          <div className={s.LineTextBlock}>
            <div className={s.LineText}>Select Rover</div>
          </div>
        </div>
        <div className={s.RoverBlock}>
          <div className={s.Rover1}>
            <img className={s.RoverBlockImg} src={Curiosity} />
            <div className={s.RoverBlockName}>Curiosity</div>
            <button className={s.RoverBlockButton} onClick={chooseRover}>
              Select
            </button>
          </div>
          <div className={s.Rover2}>
            <img className={s.RoverBlockImg} src={Opportunity} />
            <div className={s.RoverBlockName}>Opportunity</div>
            <button className={s.RoverBlockButton} onClick={chooseRover}>
              Select
            </button>
          </div>
          <div className={s.Rover3}>
            <img className={s.RoverBlockImg} src={Spirit} />
            <div className={s.RoverBlockName}>Spirit</div>

            <button className={s.RoverBlockButton} onClick={chooseRover}>
              Select
            </button>
          </div>
        </div>
      </div>
      <div className={s.SelectedRover} id="SelectedRover">
        <div className={s.Rover}>
          <img className={s.RoverImg} src="" id="RoverImg" />
          <div className={s.RoverInfo}>
            <div className={s.RoverName} id="RoverName">
              {" "}
            </div>
            <div className={s.RoverProperty}>
              <div className={s.RoverCameras}>
                <div className={s.CameraTitle}>Choose a camera</div>
                <select className={s.Camera} id="camera" onChange={change}>
                  <option>None</option>
                  <option>FHAZ</option>
                  <option>RHAZ</option>
                  <option>MAST</option>
                  <option>CHEMCAM</option>
                  <option>MAHLI</option>
                  <option>MARDI</option>
                  <option>NAVCAM</option>
                  <option>PANCAM</option>
                  <option>MINITES</option>
                </select>
              </div>
              <div className={s.SolDay}>
                <div className={s.SolDayTitle}>Input Sol Day</div>
                <input
                  className={s.SolDayInput}
                  id="solInput"
                  onChange={change}
                ></input>
              </div>
            </div>
            <button className={s.ShowButton} onClick={SendRequest}>
              Show
            </button>
          </div>
          <div className={s.Arrow}>
            <ArrowBackIcon
              className={s.ArrowIcon}
              onClick={roverReturn}
            ></ArrowBackIcon>
            <span className={s.ArrowTitle} onClick={roverReturn}>
              Return to Rovers
            </span>
          </div>
        </div>
      </div>
      <div className={s.ErrorContainer} id="Error1">
        <div className={s.Error}>
          <div className={s.ErrorTitle}>
            Data on your request does not exist<br/> (possibly the rover does not have this sol day or 
            this type of camera)
          </div>
        </div>
      </div>
      <div className={s.ErrorContainer} id="Error2">
        <div className={s.Error}>
          <div className={s.ErrorTitle}>Sol day must be number</div>
        </div>
      </div>
      <div className={s.ErrorContainer} id="Error3">
        <div className={s.Error}>
          <div className={s.ErrorTitle}>Camera can't be NONE</div>
        </div>
      </div>
      <div className={s.PhotosContainer} id="PhotosBlock">
        <div className={s.PhotoBlockTitle}>Photos of Mars </div>
        <div className={s.PhotosBlock}>
          <div className={s.Photos}>
            <div> {Photos}</div>
          </div>
        </div>
      </div>
      <div className={s.LoadBlock} id="Load">
        <button className={s.Load} onClick={loadMore}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
