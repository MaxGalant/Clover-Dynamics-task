import s from "./App.module.scss";
import Curiosity from "./Img/curiosity.jpg";
import Opportunity from "./Img/Opportunity.jpg";
import Spirit from "./Img/Spirit.jpg";
import Axios from "axios";
import { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function App(props) {
  const [photos, setPhotos] = useState([]);
  const [Length, setLength] = useState(5);
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
    SelectedRover.style.display = "inline";
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
    setLength(Length + 5);
    console.log(Length);
    if (Length + 5 > photos.length) {
      let load = document.getElementById("Load");
      load.style.display = "none";
    }
  }
  function SendRequest() {
    let block = document.getElementById("PhotosBlock");
    let photoError = document.getElementById("Error");
    let name = document.getElementById("RoverName");
    let camera = document.getElementById("camera");
    let sol = document.getElementById("solInput");
    let load = document.getElementById("Load");
    Axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${
        name.innerHTML
      }/photos?sol=${Number.parseInt(sol.value)}&camera=${
        camera.value
      }&api_key=rHOBuDjqX5lc2JJc2TDc2nJBc2hZbT08qNXlb0Gv`
    ).then((Response) => {
      setPhotos(Response.data.photos);
      if (Response.data.photos.length > 5) {
        load.style.display = "grid";
      }
      if (Response.data.photos.length > 0) {
        photoError.style.display = "none";
        block.style.display = "inline";
      } else {
        block.style.display = "none";
        photoError.style.display = "inline";
      }
    });
  }
  let newArray = photos.slice(0, Length);
  let Photos = newArray.map((p) => {
    return (
      <div key={p.id}>
        <img className={s.Photo} src={p.img_src} />
      </div>
    );
  });
  return (
    <div className={s.App}>
      <div className={s.MarsTheme}></div>
      <div className={s.RoverBlock} id="RoverBlock">
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

      <div className={s.SelectedRover} id="SelectedRover">
        <div className={s.SelectedRoverContainer}>
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
      </div>
      <div className={s.ErrorContainer} id="Error">
        <div className={s.Error}>
          <div className={s.ErrorTitle}>
            Data on your request does not exist (possibly the wrong sol or rover
            does not have this type of camera)
          </div>
        </div>
      </div>
      <div className={s.PhotosContainer} id="PhotosBlock">
        <div className={s.PhotosBlock}>
          <div className={s.Photos}>
            <div className={s.PhotoBlockTitle}>The surface of Mars </div>
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
