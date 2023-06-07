import { useState } from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { Link as RouterLink, Navigate } from 'react-router-dom'
import config from '../utils/envConfig'
import { useMutation } from '@tanstack/react-query'

export const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signupMutation = useMutation(
    (data) => {
      return fetch(`${config.apiUrl}/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(async (res) => {
        if(res.ok)
          return res.json()
        throw new Error(JSON.stringify(await res.json()))
      })
    }
  )

  const handleSignup = (e) => {
    e.preventDefault()
    signupMutation.mutate({ username, password })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={ handleSignup } sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link component={RouterLink} to="/login" variant="body2">
            Already have an account? Sign in
          </Link>
          {signupMutation.isLoading ?
            <div>Signing up...</div>
            : signupMutation.isError ?
              <div>An error occurred: {signupMutation.error.message}</div>
            : signupMutation.isSuccess ?
            <>
              <div>Signup successful!</div>
              <Navigate to="/" />
            </>
            : null
          }
        </Box>
      </Box>
    </Container>
  )
}
