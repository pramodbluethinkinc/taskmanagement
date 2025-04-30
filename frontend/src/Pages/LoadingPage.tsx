import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress size="large" />
    </Box>
  );
}

export default LoadingPage;
