import { useState } from 'react';
import { Avatar } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [rememberMe, setRememberMe] = useState(false);

  const loginMutation = useMutation((data) => {
    return axios.post('/api/token/', data);
    }, {
      onSuccess: (data) => {
        Cookies.set('access', data.data.access);
        Cookies.set('refresh', data.data.refresh);
      }
    }
  );

  const handleSumit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username: username, password: password });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSumit} sx={{ mt: 1 }}>
          <TextField 
              margin="normal"
              required
              fullWidth
              onChange={(e) => setUsername(e.target.value)} 
              id="email"
              label="Username"
              variant="outlined" />
          <TextField 
              margin="normal"
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              label="Password"
              variant="outlined" />

          <FormControlLabel control={<Checkbox 
              value="remember" 
              color="primary" 
              onChange={(e) => setRememberMe(e.target.checked)}
              />} 
            label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
            {loginMutation.isLoading ? 'Logging you in...' : 'Log In'}
          </Button>
          { loginMutation.isError && <Typography color="error">{loginMutation.error.response.data.detail}</Typography> }
          { loginMutation.isSuccess && <Navigate to="/" /> }
          <Link component={RouterLink} to="/sign-up" variant="body2" sx={{ ml: "auto"}} >
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
    )
}
