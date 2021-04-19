import { GET_SHOWTIMES_FAILED,GET_SHOWTIMES_SUCCESS,GET_SHOWTIMES_REQUEST,POST_ID_THEATER_CHOOSE,POST_THEATERGROUP_CHOOSED } from "../constants/showtimes.constant";

const initialState = {
    loading :false,
    showTimes : [],
    theaterGroupChoosed: {
		maHeThongRap: 'BHDStar',
		logo: 'http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png',
        idChoose : '0',
	},
	idTheaterChoose: 'bhd-star-cineplex-3-2',
    error : null,
}

const showTimesReducer = (state = initialState, action) => {
    let {type,payload} = action;
    switch (type) {
    case GET_SHOWTIMES_REQUEST:
        state.loading = true;
        state.showTimes = null;
        state.error = null;
        return { ...state}

    case GET_SHOWTIMES_SUCCESS:
        state.loading = false;
        state.showTimes = payload;
        state.error = null;
        return { ...state}

    case GET_SHOWTIMES_FAILED:
        state.loading = false;
        state.showTimes = null;
        state.error = payload;
        return { ...state}   

    case POST_ID_THEATER_CHOOSE:
        state.idTheaterChoose = payload;
        return { ...state}    
    
    case POST_THEATERGROUP_CHOOSED:
		state.theaterGroupChoosed = payload;
		return { ...state };

    default:
        return state
    }
}
export default showTimesReducer;