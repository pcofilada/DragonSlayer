import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import LoadingScreen from '../../components/LoadingScreen';
import PlayerHealthBar from '../../components/PlayerHealthBar';

const NewGame = () => {
  const { authToken } = useContext(AuthContext);
  const [player, setPlayer] = useState({ name: '', health: 100 });
  const [dragon, setDragon] = useState({ name: 'Dragon', health: 100 });
  const [logs, setLogs] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const logsEndRef = useRef(null);
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
        setPlayer({ ...player, name: data.fullname });
        setLoading(false);
      });
  }, [player.name]);

  useEffect(() => {
    if (player.health === 0 || dragon.health === 0) {
      setFinished(true);
      const data = {
        uuid,
        health: player.health,
        opponentHealth: dragon.health,
        logs: logs
      };

      axios
        .post('http://localhost:3030/api/games', data, {
          headers: {
            'auth-token': authToken
          }
        })
        .then(({ data }) => console.log(data));
    }
  }, [player, dragon]);

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [loading, logs]);

  const scrollToBottom = () => {
    logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const numberGenerator = () => Math.floor(Math.random() * 11);

  const logger = (attacker, opponent, action, value) => {
    setLogs(log => [
      ...log,
      {
        attacker,
        opponent,
        action,
        value
      }
    ]);
  };

  const basicAttack = () => {
    const playerDamage = numberGenerator();
    const dragonDamage = numberGenerator();

    setDragon({ ...dragon, health: Math.max(0, dragon.health - playerDamage) });
    logger(player.name, dragon.name, 'attack', playerDamage);

    if (Math.max(0, dragon.health - playerDamage) === 0) {
      return;
    }

    setTimeout(() => {
      setPlayer({
        ...player,
        health: Math.max(0, player.health - dragonDamage)
      });
      logger(dragon.name, player.name, 'attack', dragonDamage);
    }, 1000);
  };

  const blastAttack = () => {
    const playerDamage = numberGenerator() + 15;
    const dragonDamage = numberGenerator() + 15;

    setDragon({ ...dragon, health: Math.max(0, dragon.health - playerDamage) });
    logger(player.name, dragon.name, 'blast', playerDamage);

    if (Math.max(0, dragon.health - playerDamage) === 0) {
      return;
    }

    setTimeout(() => {
      setPlayer({
        ...player,
        health: Math.max(0, player.health - dragonDamage)
      });
      logger(dragon.name, player.name, 'blast', dragonDamage);
    }, 1000);
  };

  const heal = () => {
    const playerHeal = numberGenerator();
    const dragonDamage = numberGenerator();

    setPlayer({ ...player, health: Math.min(100, player.health + playerHeal) });
    logger(player.name, null, 'heal', playerHeal);

    setTimeout(() => {
      setPlayer({
        ...player,
        health: Math.max(0, player.health - dragonDamage)
      });
      logger(dragon.name, player.name, 'attack', dragonDamage);
    }, 1000);
  };

  const playAgain = () => {
    const gameId = Math.random()
      .toString(36)
      .substr(2, 6);

    history.push(`/games/${gameId}`);
    window.location.reload();
  };

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

  const renderConfirmation = () => {
    const message = player.health === 0 ? 'You Lost!' : 'You Win!';

    return (
      <Dialog open={finished} fullWidth>
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
          {message} Play Again?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => playAgain()}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => history.push('/')}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return <LoadingScreen>Initializing Game...</LoadingScreen>;
  }

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
              <PlayerHealthBar name={player.name} health={player.health} />
            </Grid>
            <Typography className="divider">
              <h1>VS</h1>
            </Typography>
            <Grid item xs={5}>
              <PlayerHealthBar name={dragon.name} health={dragon.health} />
            </Grid>
          </Box>
          <Box
            className="contenders"
            display="flex"
            justifyContent="space-around"
            mt={5}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => basicAttack()}
              disabled={finished}
              style={{ width: '150px' }}
            >
              ATTACK
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => blastAttack()}
              disabled={finished}
              style={{ width: '150px' }}
            >
              BLAST
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => heal()}
              disabled={finished}
              style={{ width: '150px' }}
            >
              HEAL
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/')}
              disabled={finished}
              style={{ width: '150px' }}
            >
              GIVE UP
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
              <div ref={logsEndRef} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {renderConfirmation()}
    </div>
  );
};

export default NewGame;
