import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import { Grid, Box, TextField, Button } from '@material-ui/core';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const submitHandler = e => {
    e.preventDefault();

    axios
      .post('http://localhost:3030/api/auth/signin', {
        email,
        password
      })
      .then(({ data }) => {
        Cookies.set('token', data.token);

        history.push('/games/1');
      });
  };

  return (
    <Box display="flex" justifyContent="center" spacing={3}>
      <Grid item xs={4}>
        <form onSubmit={e => submitHandler(e)}>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
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
            style={{ marginTop: 10 }}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </Grid>
    </Box>
  );
};

export default Signin;
