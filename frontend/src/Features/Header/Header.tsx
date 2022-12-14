import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { userLogoutAsync, initialState, userInitStateAsync } from '../Registration/userSlice';
import './Header.css';
import { userProfileInitAsync } from '../Profile/userProfileSlice';
import { fontFamily } from '@mui/system';

// const pages = ['My wishes', 'My friends', 'My groups', 'Registration', 'Login'];
  const pages = [
   {
      name: 'Мои желания',
   link: '/mywishes' },

   {
      name: 'Мои друзья',
      link: '/myfriends'
   },
   {
    name: 'Антижелания',
    link: '/antiwishlist'
   },
   { name: 'Мои группы',
   link: '/mygroups' },
   { name: 'Идеи для подарков',
   link: '/wishlist' },
  ];

  const pages2 = [{
    name: 'Регистрация',
    link: '/auth/registration'
 },
 { name: 'Войти',
 link: '/auth/login' }];

  function Header(): JSX.Element {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const userState = useAppSelector((state) => state?.user);
  console.log(!!userState.login);

  const userProfileState = useAppSelector((state) => state?.userProfile);
  const dispatch = useAppDispatch();

  function handleLogout():void {
    dispatch(userLogoutAsync());
    navigate('/');
    // api.logout().then((res: Response) => res.message === 'Session destroy');
    // navigate('/');
      }

      React.useEffect(() => {
        dispatch(userInitStateAsync());
      }, [userProfileState]);

  return (
    <AppBar position="static">
      <Container className="header" maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="/img/plant.png" alt="Logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, justifyContent: 'space-around', display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {!!userState.login && pages.map((page) => (
              <Button
                id="headerBtn"
                onClick={() => navigate(page.link)}
                key={page.link}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
            {!userState.login && pages2.map((page) => (
              <Button
                key={page.link}
                onClick={() => navigate(page.link)}
                sx={{ my: 2, color: 'white', display: 'block', }}
              >
               {page.name}
              </Button>
            ))}
            {userState.login && (
<Box sx={{ display: 'flex' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ width: 56, height: 56 }} alt={userState.name} src={`http://localhost:4000/upload/${userState.image}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                navigate(`/profile/${userState.id}`);
                handleCloseUserMenu();
                }}
              >
                  <Button>Профиль</Button>
              </MenuItem>
              <MenuItem onClick={() => {
                handleLogout();
                handleCloseUserMenu();
                }}
              >
                  <Button>Выйти</Button>
              </MenuItem>
            </Menu>
</Box>
)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
