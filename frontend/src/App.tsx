import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import ViewTasks from './Pages/Tasks/ViewTasks';
import EditTask from './Pages/Tasks/EditTask';
import NotFound from './Pages/NotFound';
import NewTask from './Pages/Tasks/NewTask';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks">
          <Route index element={<ViewTasks />} />
          <Route path="create" element={<NewTask />} />
          <Route path=":taskId" element={<EditTask />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
