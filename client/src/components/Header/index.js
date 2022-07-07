import React from 'react';
import { Typography, Button, Menu, MenuItem, TextField, Modal, Select } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../../redux/actions';
import { authState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions';

import { getPostsBySearch } from '../../redux/actions';

export default function Header() {

  const classes = useStyles();

  const [loginData, setLoginData] = React.useState({
    userName: '',
    password: '',
  })
  const [registerData, setRegisterData] = React.useState({
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const { isLogined, userName } = useSelector(authState$);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isShowLoginDialog, setIsShowLoginDialog] = React.useState(null);
  const [isShowResgiterDialog, setIsShowResgiterDialog] = React.useState(null);
  const open = Boolean(anchorEl);
  const openLogin = Boolean(isShowLoginDialog);
  const openRegister = Boolean(isShowResgiterDialog);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showLoginDialog = () => {
    setIsShowLoginDialog(true);
    handleClose();

  }
  const showRegisterDialog = () => {
    setIsShowResgiterDialog(true);
    handleClose();
  }

  const handleLoginClose = React.useCallback(() => {
    setLoginData({
      userName: '',
      password: '',
    })
    setIsShowLoginDialog(false);
  }, []);

  const handleRegisterClose = React.useCallback(() => {
    setRegisterData({
      userName: '',
      password: '',
      confirmPassword: '',
    })
    setIsShowResgiterDialog(false);
  }, []);

  const onLoginSubmit = React.useCallback(() => {
    dispatch(login.loginRequest(loginData));
    handleLoginClose();
  }, [loginData, dispatch, handleLoginClose]);

  const onRegisterSubmit = React.useCallback(() => {
    dispatch(register.registerRequest(registerData));
    handleRegisterClose();
  }, [registerData, dispatch, handleRegisterClose]);

  const onLogout = React.useCallback(() => {
    handleClose();
    dispatch(logout.logoutRequest());
  }, [dispatch]);

  const loginMenu = (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem onClick={showLoginDialog}>Login</MenuItem>
      <MenuItem onClick={showRegisterDialog}>Register</MenuItem>
    </Menu>
  );

  const loginedMenu = (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem onClick={onLogout}>Logout</MenuItem>
    </Menu>
  );

  const [search, setSearch] = React.useState('');

  const [sort, setSort] = React.useState('author');

  const searchPost = React.useCallback(() => {
    if (search.trim()) {
      console.log("Search data", search)
      dispatch(getPostsBySearch.getPostsBySearchRequest(search));
    }
  }, [dispatch, search]);

  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest(sort));
  }, [dispatch]);

  const changeSort = (event) => {
    setSort(event.target.value);
  }

  return (
    <div style={{ "display": "relative", backgroundColor: "#3f51b5" }}>
      <Typography variant='h4' align='center' className={classes.container}>
        Blog
      </Typography>
      <form
        action="/"
        method="get"
        style={{
          position: 'absolute',
          top: 6
        }}
      >
        <TextField
          InputProps={{ classes: { input: classes.input1 } }}
          name="s"
          variant="outlined"
          placeholder="Search Blogs"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button

          className={classes.searchButton}
          variant="contained"
          color="primary"
          onClick={searchPost}
        >
          Search
        </Button>
      </form>
      <Select
        style={{
          position: 'absolute',
          left: "calc(35% - 76px)",
          top: 7
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Age"
        onChange={changeSort}
      >
        <MenuItem value={'author'}>Author</MenuItem>
        <MenuItem value={"title"}>Title</MenuItem>
      </Select>
      <Button
        style={{
          position: 'absolute',
          left: "calc(93% - 76px)",
          top: 7
        }}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {isLogined ? userName : 'Login'}
      </Button>
      {!isLogined ? loginMenu : loginedMenu}
      <Modal
        open={openLogin}
        className={classes.form}
        onClose={handleLoginClose}
      >
        <div className={classes.paper} id='simple-modal-title'>
          <h2>Login</h2>
          <form noValidate autoComplete='off' className={classes.form}>
            <TextField
              required
              label='Username'
              value={loginData.userName}
              onChange={(e) => setLoginData({ ...loginData, userName: e.target.value })}
            />
            <TextField
              type="password"
              required
              label='Password'
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <div className={classes.footer}>
              <Button
                variant='contained'
                color='primary'
                component='span'
                fullWidth
                onClick={onLoginSubmit}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        open={openRegister}
        className={classes.form}
        onClose={handleRegisterClose}
      >
        <div className={classes.paper} id='simple-modal-title'>
          <h2>Register</h2>
          <form noValidate autoComplete='off' className={classes.form}>
            <TextField
              required
              label='Username'
              value={registerData.userName}
              onChange={(e) => setRegisterData({ ...registerData, userName: e.target.value })}
            />
            <TextField
              type="password"
              required
              label='Password'
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <TextField
              type="password"
              required
              label='Confirm password'
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            />
            <div className={classes.footer}>
              <Button
                variant='contained'
                color='primary'
                component='span'
                fullWidth
                onClick={onRegisterSubmit}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}