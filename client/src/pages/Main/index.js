import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Box, Paper } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth';

const Main = () => {
  const { authToken } = useContext(AuthContext);
  const [games, setGames] = useState([]);
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
      });
  }, []);

  const newGame = () => {
    const gameId = Math.random()
      .toString(36)
      .substr(2, 6);

    history.push(`/games/${gameId}`);
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

  return (
    <div>
      <h2>Welcome</h2>
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
