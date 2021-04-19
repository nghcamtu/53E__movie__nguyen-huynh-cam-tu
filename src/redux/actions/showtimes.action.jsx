import axios from "axios";
import {GET_SHOWTIMES_FAILED,GET_SHOWTIMES_REQUEST,GET_SHOWTIMES_SUCCESS,POST_ID_THEATER_CHOOSE,POST_THEATERGROUP_CHOOSED} from "../constants/showtimes.constant";

export const getShowTimesActionSuccess = (data) => {
    return {
        type :GET_SHOWTIMES_SUCCESS,
        payload : data,
    }
}
export const getShowTimesActionRequest = () => {
    return {
        type :GET_SHOWTIMES_REQUEST,
    }
}
export const getShowTimesActionError = (error) => {
    return {
        type :GET_SHOWTIMES_FAILED,
        payload : error,
    }
}

export const postShowTimesChoose = (idTheaterChoosed) => {
    return {
        type :POST_ID_THEATER_CHOOSE,
        payload : idTheaterChoosed,
    }
}

export const postTheaterGroup = (maHeThongRap,logo,idChoose) =>{
    return {
        type : POST_THEATERGROUP_CHOOSED,
        payload : {
            maHeThongRap, 
            logo,
            idChoose
        }
    }
}
// Call API lấy thời gian chiếu

export const getShowTimeAPI = (id) =>{
    return async(dispatch) => {
        dispatch(getShowTimesActionRequest())
        try {
            const res = await axios ({
                method : 'GET',
                url : `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${id}&maNhom=GP09`,
            })
            dispatch(getShowTimesActionSuccess(res.data));
        } catch (error) {
            dispatch(getShowTimesActionError(error));
        }
    }
}