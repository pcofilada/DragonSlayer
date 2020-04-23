import React from 'react';
import { Typography, LinearProgress } from '@material-ui/core';

const PlayerHealthBar = props => {
  const { name, health } = props;

  return (
    <Typography className="player">
      <h2 className="name">{name}</h2>
      <div className="health">
        {health} / 100
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={health}
        />
      </div>
    </Typography>
  );
};

export default PlayerHealthBar;
