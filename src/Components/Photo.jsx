


import s from "../Style/Photo.module.scss"


const Photo=(props)=>{
    return(
        <div className={s.PhotoBlock}>
            <img src={props.src}/>
        </div>
    )

}
export default Photo