import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

function Dashboard() {
  const theme = useTheme();

  const content = (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6">
        Welcome to Dashboard! {new Date().toString()}
      </Typography>
      <List sx={{ mt: 2 }}>
        <ListItem>
          <Link
            to="/tasks"
            style={{
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            &#8226; View Tasks
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/tasks/create"
            style={{
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            &#8226; Create Task
          </Link>
        </ListItem>
      </List>
    </Container>
  );
  return content;
}
export default Dashboard;
