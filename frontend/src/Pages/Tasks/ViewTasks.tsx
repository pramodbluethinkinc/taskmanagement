import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { StatusColors, Task } from '../../Utils/Types';
import axiosInstance from '../../Utils/AxiosInstance';
import { useMessage } from '../../hooks/MessageContext';

export default function ViewTasks() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpenOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
  const { showMessage } = useMessage();

  useEffect(() => {
    axiosInstance.get('/tasks').then((res) => {
      setTasks(res.data);
      setTimeout(() => {
        console.log(res);
        setLoading(false);
      }, 1000);
    });
  }, []);

  const handleClickOpen = (task_id: number) => {
    setTaskIdToDelete(task_id);
    setConfirmDialogOpenOpen(true);
  };

  const handleClose = () => {
    setConfirmDialogOpenOpen(false);
  };

  const handleAgree = async () => {
    if (taskIdToDelete !== null) {
      try {
        const response = await axiosInstance.delete(`/tasks/${taskIdToDelete}`);

        if (response.status === 200) {
          setTasks(tasks.filter((task) => task.task_id !== taskIdToDelete));
          showMessage('Task deleted successfully', 'success');
        }
      } catch (error: any) {
        showMessage(`${error.response.data.message}`, 'error');
      }
    }

    handleClose();
  };

  const getBorderColor = (statusId: number) => {
    return StatusColors[statusId];
  };
  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '800px' }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              divider
              key={task.task_id}
              sx={{
                borderTop: `5px solid ${getBorderColor(task.status_id)}`,
                marginBottom: '1rem',
              }}
            >
              <ListItemText
                primary={task.task_name}
                secondary={task.description}
              />
              <ListItemSecondaryAction
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Created On:
                  {new Date(task.created_on).toLocaleDateString('en-CA')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Deadline: {task.deadline}
                </Typography>
                <IconButton
                  sx={{ mr: 1 }}
                  edge="end"
                  component={Link}
                  to={`/tasks/${task.task_id}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleClickOpen(task.task_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Dialog open={confirmDialogOpen} onClose={handleClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
