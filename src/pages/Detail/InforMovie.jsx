import React, {useState,useEffect } from 'react'
import ReactPlayer from 'react-player';

export default function InforMovie(props) {
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

let col = "col-6";
windowDimensions.width <= 815 ?  col = "col-12" : col = "col-6";




    return (
      <div className="row detail__trailer">
        <div className={`${col} trailer`}>
          <img src={props.infor?.hinhAnh}  alt="anh"/>
          <div className="booking">
            <a href="#lich">
              <button className="btn btn-warning mr-1">
                <i className="fas fa-money-check"></i>BOOKING
              </button>
            </a>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">
                <i className="fas fa-play"></i>
                TRAILER
              </button>
              <div
                className="modal fade bd-example-modal-lg"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <ReactPlayer width="100%" height="460px" controls url={props.infor.trailer}/>
                </div>
                </div>
              </div>
          </div>
        </div>
        <div className={`${col} detail__text`}>
          <h3>{props.infor?.tenPhim}</h3>
          <p>
            <span>Mô tả :</span> {props.infor?.moTa}{" "}
          </p>
          <p>
            <span>Đạo diễn :</span> Minh Quý
          </p>
          <p>
            <span>Thể loại :</span> Don't Know
          </p>
          <p>
            <span>Ngày khởi chiếu :</span> {
                    props.infor?.ngayKhoiChieu?.substring(8, 10) +
										props.infor?.ngayKhoiChieu?.substring(4, 8) +
										props.infor?.ngayKhoiChieu?.substring(0, 4)}
          </p>
          <p>
            <span>Thời lượng :</span> 120p
          </p>
          <p>
            <span>Ngôn ngữ :</span> Phụ đề tiềng việt
          </p>
          <p>
            <span>Đánh giá :</span> {props.infor?.danhGia} <i style={{ color: "orangered",height:'17px' }} className="fas fa-star"></i>
          </p>
        </div>
      </div>
    );
}
