import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signInAPI } from '../../redux/actions/login.action';
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import Error from '../../Layouts/Error/Error';
import ScrollToTop from "../../Layouts/ScrollToTop/ScrollToTop";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [user,setUser] = useState({
      values :{
        taiKhoan :"",
        matKhau :"",
      },
      errors :{
        taiKhoan :"",
        matKhau :"",
      }
  });
 
  const handleChange = (event) =>{
    //  let value = event.target.value;
    //  let name = event.target.name;
    let {value,name} = event.target;
     console.log(value,name);

     let newValue = {...user.values,[name]:value}
     let newError = {...user.errors};

     if(value.trim() ===""){
       newError[name]= "*Không được bỏ trống !!";}
       else {
        newError[name]= " ";
       }
     setUser ({
        values :newValue,
        errors :newError,
     });
  };
  

  const handleSubmit = (event) =>{
    console.log(event)
    event.preventDefault();
    dispatch(signInAPI(user.values,history));
    // console.log(history);
    console.log(user);
  };
  return (
    <Container component="main" maxWidth="xs">
      <ScrollToTop/>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tài khoản"
            name="taiKhoan"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value ={user.values.taiKhoan}
          />
          <span className="text text-danger">{user.errors.taiKhoan}</span>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="matKhau"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value ={user.values.matKhau}
          />
          <span className="text text-danger">{user.errors.matKhau}</span> <br/>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {props.error && <Error message={props.error.response?.data}/>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu
              </Link>
            </Grid>
            <Grid item>
              <NavLink to="/register" variant="body2">
                {"Chưa có tài khoản ? Đăng ký ngay"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <br/><br/>
    </Container>
  );
}

const mapStateToProps = (state) =>{
  return {
    loading : state.user.loading,
    error : state.user.error,
  }
}

export default connect(mapStateToProps)(SignIn);