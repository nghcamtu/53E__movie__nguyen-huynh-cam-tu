import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink, Redirect } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { signUpAPI } from '../../redux/actions/register.action';
import Swal from 'sweetalert2';
import {useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import Error from '../../Layouts/Error/Error';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




function SignUp(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

const [user,setUser] = useState({
    values :{
      taiKhoan :"",
      matKhau :"",
      email :"",
      soDt : "",
      hoTen :"",
      maNhom :"GP01",
    },
    errors :{
      taiKhoan :"",
      matKhau :"",
      email :"",
      soDt : "",
      hoTen :"",
      // maNhom :"",
    }
});
const handleChange = (event) =>{
  let {value,name,type} = event.target;
  //  console.log(value,name);

   let newValue = {...user.values,[name]:value}
   let newError = {...user.errors};

   if(value.trim() ===""){
     newError[name]= "*Không được bỏ trống !!";
    } else {
      newError[name] = '';
    }
//  if(name === 'passWordConFirm'){
    //    if(value === newValue['matKhau']){
    //     newError[name] = '';
    //    } else {
    //     newError[name] = 'Mật khẩu nhập lại chưa đúng !';
    //    }
    //  }
   if(type === "email"){
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regexEmail.test(value)){
        newError[name] = '*Email không hợp lệ !!';
      } else {
        newError[name] = '';
      }
   }
   
   if (name === "soDt") {
    const parternSodt = /((09|03|07|08|05)+([0-9]{8})\b)/; 
      if(!parternSodt.test(value)){
        newError[name] ="*Số điện thoại không hợp lệ !!.(VD: 0364567890)";
      } else {
        newError[name] = '';
      }
  }
   setUser ({
      values :newValue,
      errors :newError,
   });
};

const handleSubmit = (event) =>{
  event.preventDefault();
  let {values,errors} = user;
  //Biến form khi hợp lệ
  let valid = true;

  for (const key in values) {
    if (values[key] === '') {
      valid = false;
    }
  }
  for (const key in errors) {
    if (errors[key] !== '') {
      valid = false;
    }
  }
  
  if(!valid){
    Swal.fire({
      title: 'Lỗi!',
      text: 'Dữ liệu chưa hợp lệ !',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    return;
  }else {
    if(props.Error === null){
      Swal.fire({
        title: 'Thành công!',
        text: 'Dữ liệu hợp lệ !',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }
  dispatch(signUpAPI(user.values,history));
  console.log(user);
};
const userSignIn = JSON.parse(localStorage.getItem('userLogin'));
  return !userSignIn? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="hoTen"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Họ Tên"
                autoFocus
                defaultValue={user.values.hoTen}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.hoTen}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type ="email"
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                defaultValue={user.values.email}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.email}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="soDt"
                label="Số điện thoại"
                name="soDt"
                autoComplete="soDT"
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.soDt}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="taiKhoan"
                label="Tài khoản"
                type="taiKhoan"
                id="taiKhoan"
                autoComplete="current-taiKhoan"
                defaultValue={user.values.taiKhoan}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.taiKhoan}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="matKhau"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="passWord"
                label="Mật khẩu"
                defaultValue={user.values.matKhau}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.matKhau}</span>
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="maNhom"
                label="Mã nhóm (*GP01 đến GP10)"
                name="maNhom"
                autoComplete="maNhom"
                defaultValue={user.values.maNhom}
                onChange={handleChange}
              />
              <span className="text text-danger">{user.errors.maNhom}</span>
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Tôi muốn nhận thông báo mới nhất !"
              />
              {props.error && <Error message={props.error.response?.data}/>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng ký
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/login">
                Đã có tài khoản ! Đăng nhập ngay
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div> <br/> <br/>
    </Container>
  ):(
    <Redirect to="/"/>
  );
}
const mapStateToProps = (state) =>({
  error : state.userRegister.error,
  loading : state.userRegister.loading
})
export default connect(mapStateToProps)(SignUp)