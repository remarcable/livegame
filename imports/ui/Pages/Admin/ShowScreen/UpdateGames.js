import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

import blue from '@material-ui/core/colors/blue';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  games: PropTypes.array.isRequired, // TODO: better proptype
  updateScores: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired,
  candidate1Name: PropTypes.string,
  candidate2Name: PropTypes.string,
  scoreText: PropTypes.string,
};

const UpdateGames = ({
  classes,
  games,
  updateScores,
  setWinner,
  candidate1Name = 'Kandidat 1',
  candidate2Name = 'Kandidat 2',
  scoreText,
}) => (
  <>
    <Table>
      <TableHead className={classes.stickyHeader}>
        <TableRow className={classes.gamesHeader}>
          <TableCell>Spiel</TableCell>
          <TableCell>{scoreText}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map(({ _id, state, title, fullShowGame }) => (
          <TableRow key={_id} selected={state === 'ACTIVE'}>
            <TableCell>{title}</TableCell>
            <TableCell>
              <form onSubmit={(e) => handleSubmit(e, updateScores, _id)} className={classes.form}>
                <TextField
                  type="number"
                  name="candidate1"
                  label="Punkte"
                  defaultValue={fullShowGame.pointsCandidate1}
                  className={classes.textField}
                />
                <input type="submit" style={{ display: 'none' }} />
                <Button
                  size="small"
                  disabled={fullShowGame.winner === 'CANDIDATE1'}
                  classes={{ disabled: classes.disabledButton }}
                  onClick={() => setWinner({ _id, winner: 'CANDIDATE1' })}
                >
                  {candidate1Name}
                </Button>
                <Button
                  size="small"
                  disabled={fullShowGame.winner === 'CANDIDATE2'}
                  classes={{ disabled: classes.disabledButton }}
                  onClick={() => setWinner({ _id, winner: 'CANDIDATE2' })}
                >
                  {candidate2Name}
                </Button>
                <Button
                  size="small"
                  disabled={fullShowGame.winner === 'NONE'}
                  classes={{ disabled: classes.disabledButton }}
                  onClick={() => setWinner({ _id, winner: 'NONE' })}
                >
                  KEINER
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

function handleSubmit(e, updateScores, _id) {
  e.preventDefault();
  e.target.candidate1.blur();

  const pointsCandidate1 = +e.target.candidate1.value;

  updateScores({ _id, pointsCandidate1, pointsCandidate2: 0 });
}

const styles = ({ palette }) => ({
  textField: {
    width: 50,
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: palette.background.paper,
    zIndex: 5,
  },
  gamesHeader: {
    textAlign: 'center',
  },
  disabledButton: {
    color: [blue.A400, '!important'],
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

UpdateGames.propTypes = propTypes;

export default withStyles(styles)(UpdateGames);
