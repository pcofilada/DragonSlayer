import React, { useState, useEffect } from 'react';

const Game = () => {
  const [player, setPlayer] = useState({ name: 'Patrick', health: 100 });
  const [dragon, setDragon] = useState({ name: 'Dragon', health: 100 });
  const [logs, setLogs] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (player.health === 0 || dragon.health === 0) {
      setFinished(true);
    }
  }, [player, dragon]);

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
    <div>
      <div className="player">
        <div>{player.name}</div>
        <div>{player.health}</div>
      </div>
      <div className="dragon">
        <div>{dragon.name}</div>
        <div>{dragon.health}</div>
      </div>
      <button onClick={() => basicAttack()} disabled={finished}>
        Attack
      </button>
      <button onClick={() => blastAttack()} disabled={finished}>
        Blast
      </button>
      <button onClick={() => heal()} disabled={finished}>
        Heal
      </button>
      <div className="actions">
        {logs.map(log => (
          <div key={log.value}>{renderLog(log)}</div>
        ))}
      </div>
    </div>
  );
};

export default Game;
