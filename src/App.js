import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import Notfound from './pages/PageNotFound/Notfound';
import Footer from './Layouts/Footer/Footer';
import Header from './Layouts/Header/Header';
import Register from './pages/Register/Register';
import { connect } from 'react-redux';
import { signInActionSuccess } from './redux/actions/login.action';
import React , {useEffect,Suspense} from 'react';
import Loading from "./Layouts/Loading/Loading";
import Booking from './pages/Booking/Booking';
import {useDispatch} from "react-redux";
import Account from './pages/Account/Account';
// animation
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import ScrollToTop from './Layouts/ScrollToTop/ScrollToTop';


function App() {
  const dispatch = useDispatch();
  //Kiểm tra localStorage có tài khoản đang đăng nhập không
   const getCredentialfromLocal = () =>{
    const credentialsStr = localStorage.getItem("userLogin");
    if(credentialsStr) {
    dispatch(signInActionSuccess(JSON.parse(credentialsStr)))
    }
  }
  useEffect(() => {
    getCredentialfromLocal(); 
   },[]);
   

  //  Animation
  return (
    <Router>
      <ScrollToTop/>
    <Suspense fallback={<Loading/>}>
    <Header/>
    <Route render={({location})=>(
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={0}
          classNames="item"
                >
          <Switch location={location}>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/detail/:id" component={Detail}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/booking/:id" component={Booking}/>
            <Route exact path="/account" component={Account}/>
            <Route path="*" component={Notfound}/>
          </Switch>
          </CSSTransition>
        </TransitionGroup>
    )}/>
      <Footer/>
      </Suspense>
    </Router>
  ); 
}
export default connect() (App);
