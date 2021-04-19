import React ,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { postTheaterGroup } from '../../redux/actions/showtimes.action';
import { useHistory } from 'react-router-dom';

export default function ShowTimeMovie(props) {
    const history = useHistory();
    const [isSelected,setIsSelected] = useState(0);
    const dispatch = useDispatch();

    const theater = useSelector(state => state.inforMovie.inforMovie);
    const showTimes = useSelector(state => state.showTimes.theaterGroupChoosed);
    // console.log(showTimes)
    // console.log(theater)
    const userSignIn = useSelector((state) => state.user.userSignin);
    const handleChoiceShowsTime = (id) => {
        if (userSignIn?.accessToken.length > 0) {
          history.push({ pathname: `/booking/${id}`})
        } else {
          history.push({pathname: '/login'});
        } 
      };

    // Show rap
    const chooseTheaterGroup = (maHeThongRap,logo,index)=>{
        setIsSelected(index);
        dispatch(postTheaterGroup(maHeThongRap,logo,index));
    }
    let nonClassActive = 'non_active_theater';
    let Active = 'active_theater';
    const renderTheater = () =>{
        return (
            theater?.heThongRapChieu?.map((theater,index)=>{
                return (
                  <div  key={index} className={`theater_item ${isSelected===index ? Active : nonClassActive}`}
                  onClick={()=>(
                    isSelected === index ? '':chooseTheaterGroup(theater.maHeThongRap,theater.logo,index)
                  )} 
                  >
                    <img src={theater.logo} alt="anh"/>
                    <span>{theater.tenHeThongRap}</span>
                  </div>
                );
            })
        )
    }

    //Lấy kích thước màn h
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);
// console.log(windowDimensions);

let col1 = "col-4";
let col2 = "col-8";
windowDimensions.width <= 845 ?  col1 = "col-12" : col1 = "col-4";
windowDimensions.width <= 845 ?  col2 = "col-12" : col2 = "col-8";
    // const render
    return (
      <div className="row showsTime">
        <div className={`${col1} showTheater`}>{renderTheater()}</div>
        <div className={`${col2} showTime`}>
          {/* <div className="row day">
            <div className="col-2 day_show">01-01</div>
          </div> */}
          {
          theater?.heThongRapChieu?.map((item)=>{
            // console.log(item)
            return(
              item.cumRapChieu?.map((cumRap, index) => {
                // console.log(cumRap)
                  return (
                    <div key={index} className="hour">
                      <div className="hour__theater">
                        <img src={showTimes.logo} alt="anh" />
                        <span>{cumRap?.tenCumRap}</span>
                      </div>
                      <p>Giờ chiếu :</p>
                      <div className="gio">
                        {cumRap.lichChieuPhim?.map((item, index) => {
                          return (
                            <button
                              className={`btn btn-warning mr-2 mb-2`}
                              key={index}
                              onClick={() => {
                                handleChoiceShowsTime(item.maLichChieu);
                              }}
                            >
                              {item.ngayChieuGioChieu?.substring(11, 16) + "~"}
                              <b>{item.ngayChieuGioChieu?.substring(5, 10)}</b>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
            )
            )
          })
          }
        </div>
      </div>
    ); 
}
