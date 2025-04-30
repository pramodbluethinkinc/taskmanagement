import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Stack } from '@mui/material';
import { useMessage } from '../../hooks/MessageContext';
import axiosInstance from '../../Utils/AxiosInstance';
import { Status, Task } from '../../Utils/Types';

export default function EditTask() {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [statuses, setStatuses] = useState<Status[] | null>(null);
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance(`/tasks/${taskId}`)
      .then((res: any) => {
        setTask(res.data[0]);
      })
      .catch((error) => console.error(error));
  }, [taskId]);

  useEffect(() => {
    axiosInstance('/status')
      .then((response) => response.data)
      .then((data) => setStatuses(data));
  }, []);

  if (!task || !statuses) {
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
      const response = await axiosInstance.put(`/tasks/${taskId}`, {
        ...task,
      });

      if (response.status === 200) {
        showMessage('Task updated successfully', 'success');
        navigate(-1); // navigate back to the previous page
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
