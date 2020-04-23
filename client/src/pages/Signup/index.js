import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { Grid, Box, TextField, Button } from '@material-ui/core';

const Signin = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const submitHandler = e => {
    e.preventDefault();

    axios
      .post('http://localhost:3030/api/auth/signup', {
        fullname,
        email,
        password
      })
      .then(({ data }) => {
        setTimeout(() => {
          history.push('/signin');
        }, 1000);
      });
  };

  return (
    <Box display="flex" justifyContent="center" spacing={3}>
      <Grid item xs={4}>
        <form onSubmit={e => submitHandler(e)}>
          <TextField
            id="fullname"
            label="Fullname"
            type="text"
            variant="outlined"
            fullWidth
            value={fullname}
            onChange={e => setFullname(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            style={{ marginTop: 10, marginBottom: 10 }}
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginTop: 10, marginBottom: 10 }}
            type="submit"
          >
            Sign Up
          </Button>
          <small>
            Have Account Already? <Link to="/signin">Sign In</Link>
          </small>
        </form>
      </Grid>
    </Box>
  );
};

export default Signin;
