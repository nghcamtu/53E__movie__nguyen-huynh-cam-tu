import React, { useEffect } from "react";
import screen from "../../assets/images/screen.png";
import ChairRoom from "./ChairRoom";
import InforBookChair from "./InforBookChair";
import { getChairListAPI } from "../../redux/actions/booking.action";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../../Layouts/Loading/Loading";
import {Redirect} from "react-router-dom";
import { useParams } from "react-router-dom";
import ScrollToTop from "../../Layouts/ScrollToTop/ScrollToTop";
import TimeBooking from "./TimeBooking";
import Notfound from "../PageNotFound/Notfound";

export default function Booking(props) {
  let inforBK = useSelector((state) => state.chair.inforBooking);
  let chairList = useSelector((state) => state.chair.chairList);
  let error = useSelector((state) => state.chair.error);
  console.log(error);
  const { id } = useParams();
  const userSignIn = JSON.parse(localStorage.getItem('userLogin'));
  // console.log(userSignIn);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChairListAPI(id));
  }, [dispatch,id]);

  //Chia mảng ghế
  const chunkArray = (myArray, chunk_size) => {
    var results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  };
  if (chairList && chairList.length > 0) {
    let listChair = [...chairList];
    var result = chunkArray(listChair,16);
  }
  // console.log(result);

  const renderChairList = () => {
    return result?.map((item, index) => {
      return <ChairRoom chair={item} key={index} />;
    });
  };
  
  if(error) return (<Notfound/>)
  if(chairList === null ) return (<Loading/>);
 
  return userSignIn ? (
    <section id="booking" className="container-fluid">
      <ScrollToTop/>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="row infor__movie">
            <div className="col-6 info__movie">
              <img className="imgMovie" src={inforBK?.hinhAnh} alt="anh"/>
              <div className="infor">
                <p>{inforBK?.tenPhim}</p>
                <p>{inforBK?.diaChi}</p>
              </div>
            </div>
            <TimeBooking/>
          </div>
          <div className="row screen">
            <img src={screen} alt="anh"/>
          </div>
          <div className="row chair">
            {renderChairList()}
          </div>
          <div className="row note">
            <div className="noteseat">
              <span className="note__item">
                <div className="seat-normal" />
                <p className="seat-info">Thường</p>
              </span>
              <span className="note__item">
                <div className="seat-vip" />
                <p className="seat-info">VIP</p>
              </span>
              <span className="note__item">
                <div className="seat-current" />
                <p className="seat-info">Đang chọn</p>
              </span>
              <span className="note__item">
                <div className="seat-taken" />
                <p className="seat-info">Đã được chọn</p>
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <InforBookChair info={inforBK} />
        </div>
      </div>
    </section>
  ): (
    <Redirect to="/" />
  )
}
