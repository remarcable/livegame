import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
};

const UpdateGames = ({
  classes,
  games,
  updateScores,
  setWinner,
  candidate1Name = 'Kandidat 1',
  candidate2Name = 'Kandidat 2',
}) => (
  <>
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.gamesHeader}>
          <TableCell>Spiele</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map(({ _id, state, fullShowGame }) => (
          <TableRow key={_id} selected={state === 'ACTIVE'}>
            <TableCell padding="dense">
              <form onSubmit={(e) => handleSubmit(e, updateScores, _id)}>
                {fullShowGame.gameNumber.toString().padStart(2, 0)}.
                <TextField
                  type="number"
                  name="candidate1"
                  label={candidate1Name}
                  defaultValue={fullShowGame.pointsCandidate1}
                  className={classes.textField}
                />
                <TextField
                  type="number"
                  name="candidate2"
                  label={candidate2Name}
                  defaultValue={fullShowGame.pointsCandidate2}
                  className={classes.textField}
                />
                <IconButton type="submit" size="small">
                  <DoneIcon />
                </IconButton>
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
    ))}
  </>
);

function handleSubmit(e, updateScores, _id) {
  e.preventDefault();

  const pointsCandidate1 = +e.target.candidate1.value;
  const pointsCandidate2 = +e.target.candidate2.value;

  updateScores({ _id, pointsCandidate1, pointsCandidate2 });
}

const styles = {
  textField: {
    width: 50,
  },
  gamesHeader: {
    textAlign: 'center',
  },
  disabledButton: {
    color: [blue.A400, '!important'],
  },
};

UpdateGames.propTypes = propTypes;

export default withStyles(styles)(UpdateGames);
