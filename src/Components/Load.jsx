
import s from "../Style/load.module.scss";
const Load=(props)=>{
    return(
    <button className={s.Load} onClick={props.loadMore}>
        Load more
      </button>
    )

}
export default Load