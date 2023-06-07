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
import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSumit = (e) => {
    e.preventDefault();
    console.log(emailOrUsername, password, rememberMe);
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
              onChange={(e) => setEmailOrUsername(e.target.value)} 
              id="email"
              label="Email or Username"
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Log In</Button>
          <Link component={RouterLink} to="/sign-up" variant="body2" sx={{ ml: "auto"}} >
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
    )
}
