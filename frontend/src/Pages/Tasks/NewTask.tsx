// NewTask.tsx

import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/AxiosInstance';
import { Task, Status } from '../../Utils/Types';
import { useMessage } from '../../hooks/MessageContext';
import { useKeycloak } from '../../hooks/KeycloakContext';

export default function NewTask() {
  const { keycloak } = useKeycloak();
  const [task, setTask] = useState<Task>({
    task_name: '',
    description: '',
    deadline: '',
    status_id: 1,
    assigned_to: keycloak?.tokenParsed?.sub || '',
    created_on: '',
    last_update: '',
    task_id: 0,
  });
  const [statuses, setStatuses] = useState<Status[] | null>(null);
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance('/status')
      .then((response) => response.data)
      .then((data) => setStatuses(data));
  }, []);

  if (!statuses) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '800px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(`/tasks/`, {
        ...task,
      });

      if (response.status === 200) {
        showMessage('Task updated successfully', 'success');
        // Clear the form
        setTask({
          task_name: '',
          description: '',
          deadline: '',
          status_id: 1,
          assigned_to: keycloak?.tokenParsed?.sub || '',
          created_on: '',
          last_update: '',
          task_id: 0,
        });
        // Navigate to the task list
        navigate('/tasks');
      } else {
        showMessage('Error updating task', 'error');
      }
    } catch (error: any) {
      console.error(error);
      showMessage(`${error.response.data.message}`, 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof task;
    const { value } = e.target;

    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name as keyof typeof task;
    const value = Number(e.target.value);

    setTask({
      ...task,
      [name]: value,
    });
  };

  return (
    <Container sx={{ marginTop: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack display="flex" direction="column" spacing={3}>
          <TextField
            label="Task Name"
            name="task_name"
            placeholder="Task Name"
            value={task.task_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleInputChange}
            multiline
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth>
            <InputLabel id="Status">Status</InputLabel>
            <Select
              label="Status"
              name="status_id"
              value={task.status_id.toString()}
              onChange={handleSelectChange}
              fullWidth
              required
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
            >
              {statuses.map((status) => (
                <MenuItem key={status.id} value={status.id.toString()}>
                  {status.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="deadline"
            label="Deadline"
            type="date"
            value={task.deadline}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
