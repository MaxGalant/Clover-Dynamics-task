import s from "../App.module.scss";

const ErrorComponent = (props) => {
  return (
    <div className={s.Error}>
      <div className={s.ErrorTitle}>
        {props.text}
      </div>
    </div>
  );
};
export default ErrorComponent;
