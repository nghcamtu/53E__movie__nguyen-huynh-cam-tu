import React from 'react'
import star1 from '../../../assets/images/star1.png'
import star2 from '../../../assets/images/star2.png'
import {useHistory} from "react-router-dom";

export default function MovieItems(props) {
    const history = useHistory();
    
    const handleClickMovie = (idMovie) =>{
        history.push({pathname : `/detail/${idMovie}`});
    }
    return (
        <div className="movieItem" onClick={()=>{
            handleClickMovie(props.item.maPhim)
        }}>
        <div className="movieItem__img">
            <a className="img__link">
                <img className="img-fluid img__movie" src={props.item.hinhAnh} alt="anh"/>
            </a>
        </div>
        <div className="showing__head">
            <span className="showing__age">C13</span>{props.item.tenPhim}
            <div className="showing__point">
            <span>{props.item.danhGia}</span>
            <div className="star">
                <img src={star1} alt="star"/>
                <img src={star2} alt="star2"/>
            </div>
        </div>
        </div>
        <div className="showing__btn">
            <button className="btn__movie" onClick={()=>{
                handleClickMovie(props.item.maPhim)
            }}>
                MUA VÉ
            </button>
        </div>
        
    </div>
    )
}
