import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const [games, setGames] = useState([]);
  let history = useHistory();

  const newGame = () => {
    const gameId = Math.random()
      .toString(36)
      .substr(2, 6);

    history.push(`/games/${gameId}`);
  };

  return (
    <div>
      <h2>Welcome</h2>
      <div className="game-records">
        <h4>Game Records</h4>
        <div>{games.length > 0 ? 'test' : 'No Available Game Record'}</div>
        <Button color="primary" variant="contained" onClick={() => newGame()}>
          New Game
        </Button>
      </div>
    </div>
  );
};
export default Main;
