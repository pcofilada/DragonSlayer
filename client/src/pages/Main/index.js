import React, { useState, useEffect, useContext } from 'react';
import { Button, Box } from '@material-ui/core';
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
      <>
        {games.map(game => (
          <div>
            <Link key={game.uuid} to={`/games/${game.uuid}/view`}>
              Game {game.uuid}
            </Link>
          </div>
        ))}
      </>
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
