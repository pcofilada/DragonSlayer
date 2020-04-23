import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Box, Paper } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/auth';
import LoadingScreen from '../../components/LoadingScreen';

const Main = () => {
  const { authToken } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    axios
      .get('http://localhost:3030/api/games', {
        headers: {
          'auth-token': authToken
        }
      })
      .then(({ data }) => {
        setGames(data);
        setLoading(false);
      });
  }, []);

  const newGame = () => {
    const gameId = Math.random()
      .toString(36)
      .substr(2, 6);

    history.push(`/games/${gameId}`);
  };

  const logout = () => {
    Cookies.remove('token');
    history.push('/signin');
  };

  const renderGameList = () => {
    return (
      <Grid container spacing={3}>
        {games.map(game => (
          <Grid item xs={3}>
            <Paper>
              <Box
                display="flex"
                p={5}
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                {game.health !== 0 ? (
                  <SentimentSatisfiedAltIcon fontSize="large" />
                ) : (
                  <SentimentVeryDissatisfiedIcon fontSize="large" />
                )}
                <div>Game ID: {game.uuid}</div>
                <Link to={`/games/${game.uuid}/view`}>View Game</Link>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  if (loading) {
    return <LoadingScreen>Fetching Your Data...</LoadingScreen>;
  }

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <h2>Welcome</h2>
        <Button size="small" onClick={() => logout()}>
          Logout
        </Button>
      </Box>
      <div className="game-records">
        <h4>Game Records</h4>
        <Box mb={5}>
          {games.length > 0 ? renderGameList() : 'No Available Game Record'}
        </Box>
        <Button color="primary" variant="contained" onClick={() => newGame()}>
          New Game
        </Button>
      </div>
    </div>
  );
};
export default Main;
