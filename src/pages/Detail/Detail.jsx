import React from 'react'
import InforMovie from './InforMovie'
import ShowTimeMovie from './ShowTimeMovie'
import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getInforMovieListAPI } from "./../../redux/actions/inforMovie.action";
import ScrollToTop from '../../Layouts/ScrollToTop/ScrollToTop';
import Loading from '../../Layouts/Loading/Loading';
import Notfound from '../PageNotFound/Notfound';

export default function Detail(props) {
    let error = useSelector((state) => state.inforMovie.error);
    const {id} = useParams();
    // console.log(id)
    const dispatch = useDispatch();
    const inforMovie = useSelector(state => state.inforMovie.inforMovie);
    const loading = useSelector(state => state.inforMovie.loading);
    // console.log(inforMovie)
    useEffect(() => {
        dispatch(getInforMovieListAPI(id));        
    },[dispatch,id]);

    if(error) return (<Notfound/>) 
    if(loading === true) return (<Loading/>) 
    return (
        <div id="detail">
            <ScrollToTop/>
            <InforMovie infor={inforMovie}/>
            <p id="lich">Lịch chiếu</p>
            <ShowTimeMovie showTime={inforMovie}/>
        </div>
    )
}
