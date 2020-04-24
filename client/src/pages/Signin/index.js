import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (email.length !== 0 && password.length !== 0) {
      setSubmitDisabled(false);
    }
  }, [email, password]);

  const submitHandler = e => {
    e.preventDefault();

    setSubmitDisabled(true);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/signin`, {
        email,
        password
      })
      .then(({ data }) => {
        Cookies.set('token', data.token);

        history.push('/');
        window.location.reload();
      })
      .catch(() => {
        setPassword('');
        setLoading(false);
      });
  };

  return (
    <Box display="flex" justifyContent="center" spacing={3}>
      <Grid item xs={12} sm={6} md={8} lg={4}>
        <form onSubmit={e => submitHandler(e)}>
          <Input
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
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
            type="submit"
            disabled={submitDisabled}
            loading={loading}
          >
            Sign In
          </Button>
          <small>
            No Account Yet? <Link to="/signup">Sign Up</Link>
          </small>
        </form>
      </Grid>
    </Box>
  );
};

export default Signin;
