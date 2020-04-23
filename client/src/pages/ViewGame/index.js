import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core';

const ViewGame = () => {
  const { authToken } = useContext(AuthContext);
  const [player, setPlayer] = useState({ name: 'Patrick', health: 100 });
  const [dragon, setDragon] = useState({ name: 'Dragon', health: 100 });
  const [logs, setLogs] = useState([]);
  let { uuid } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios
      .get('http://localhost:3030/api/auth/me', {
        headers: {
          'auth-token': authToken
        }
      })
      .then(({ data }) => {
        const fullname = data.fullname;

        axios
          .get(`http://localhost:3030/api/games/${uuid}`, {
            headers: {
              'auth-token': authToken
            }
          })
          .then(({ data }) => {
            setPlayer({ name: fullname, health: data.health });
            setDragon({ ...dragon, health: data.opponentHealth });
            setLogs(data.logs);
          });
      });
  }, []);

  const renderLog = log => {
    switch (log.action) {
      case 'heal':
        return `${log.attacker} used heal and gain ${log.value} health points`;
      case 'blast':
        return `${log.attacker} used blast attack to ${log.opponent} and dealt ${log.value} damage`;
      default:
        if (log.value === 0) {
          return `${log.attacker} used attack to ${log.opponent} but missed`;
        }

        return `${log.attacker} used attack to ${log.opponent} and dealt ${log.value} damage`;
    }
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Box
            className="contenders"
            display="flex"
            justifyContent="space-around"
          >
            <Grid item xs={5}>
              <Typography className="player">
                <h2 className="name">{player.name}</h2>
                <div className="health">
                  {player.health} / 100
                  <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={player.health}
                  />
                </div>
              </Typography>
            </Grid>
            <Typography className="divider">
              <h1>VS</h1>
            </Typography>
            <Grid item xs={5}>
              <Typography className="dragon">
                <h2 className="name">{dragon.name}</h2>
                <div className="health">
                  {dragon.health} / 100
                  <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={dragon.health}
                  />
                </div>
              </Typography>
            </Grid>
          </Box>
          <Box className="contenders" ml={2} mt={5}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '150px' }}
              onClick={() => history.goBack()}
            >
              BACK
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <h4>Logs</h4>
          <Paper elevation={0} variant="outlined">
            <Box m={2} height={200} style={{ overflow: 'scroll' }}>
              {logs.map((log, index) => (
                <div key={index}>{renderLog(log)}</div>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewGame;