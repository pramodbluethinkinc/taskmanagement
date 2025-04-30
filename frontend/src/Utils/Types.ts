import {
  indigo,
  teal,
  lightBlue,
  grey,
  deepOrange,
  amber,
} from '@mui/material/colors';

export interface Task {
  task_id: number;
  task_name: string;
  description: string;
  assigned_to: string;
  status_id: number;
  deadline: string;
  created_on: string;
  last_update: string;
}

export interface Status {
  id: number;
  description: string;
}

export const StatusColors: Record<number, string> = {
  1: indigo[500], // Open
  2: teal[500], // In Progress
  3: lightBlue[500], // Completed
  4: grey[500], // Closed
  5: deepOrange[500], // Cancelled
  6: amber[500], // On Hold
};
