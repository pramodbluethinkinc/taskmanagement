import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { useKeycloak } from '../hooks/KeycloakContext';
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useThemeContext } from '../hooks/ThemeContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { userProfile, keycloak } = useKeycloak();
  const { themeMode, toggleDarkMode } = useThemeContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: string) => {
    switch (setting) {
      case 'Logout':
        keycloak?.logout();
        break;
      case 'Profile':
        console.log('====================================');
        console.log('Profile');
        console.log('====================================');
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  const settings = ['Profile', 'Logout'];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" noWrap sx={{ fontWeight: '600' }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                background: 'linear-gradient(to right, #05c9f9, #e5f61b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Task Management
            </Link>
          </Typography>
          <Box>
            <IconButton onClick={toggleDarkMode} sx={{ color: 'white' }}>
              {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt={userProfile?.username}
                  src={`${
                    import.meta.env.VITE_AVATAR_BASE_URL
                  }${userProfile?.username}`}
                />
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
