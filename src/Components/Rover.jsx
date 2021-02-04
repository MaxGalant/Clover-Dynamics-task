import s from "../Style/rover.module.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Rover = (props) => {
  return (
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
              <select className={s.Camera} id="camera" onChange={props.change}>
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
                onChange={props.change}
              ></input>
            </div>
          </div>
          <button className={s.ShowButton} onClick={props.SendRequest}>
            Show
          </button>
        </div>
        <div className={s.Arrow}>
          <ArrowBackIcon
            className={s.ArrowIcon}
            onClick={props.roverReturn}
          ></ArrowBackIcon>
          <span className={s.ArrowTitle} onClick={props.roverReturn}>
            Return to Rovers
          </span>
        </div>
      </div>
    </div>
  );
};
export default Rover;
