import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container } from '@mui/material';

const Layout = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  );
};
export default Layout;
