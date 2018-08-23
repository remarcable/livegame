import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  games: PropTypes.array.isRequired, // TODO: better proptype
  updateScores: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired,
};

const UpdateGames = ({ games, updateScores, setWinner }) => (
  <>
    {games.map(({ _id, fullShowGame }) => (
      <div key={_id}>
        <form onSubmit={(e) => handleSubmit(e, updateScores, _id)}>
          <span>{fullShowGame.gameNumber}</span>
          <input
            type="number"
            name="paul"
            placeholder="Punkte Paul"
            defaultValue={fullShowGame.pointsPaul}
          />
          <input
            type="number"
            name="candidate"
            placeholder="Punkte Kandidat"
            defaultValue={fullShowGame.pointsCandidate}
          />
          <input type="submit" />
          <button
            disabled={fullShowGame.winner === 'PAUL'}
            onClick={() => setWinner({ _id, winner: 'PAUL' })}
          >
            PAUL
          </button>
          <button
            disabled={fullShowGame.winner === 'CANDIDATE'}
            onClick={() => setWinner({ _id, winner: 'CANDIDATE' })}
          >
            KANDIDAT
          </button>
          <button
            disabled={fullShowGame.winner === null}
            onClick={() => setWinner({ _id, winner: null })}
          >
            KEINER
          </button>
        </form>
      </div>
    ))}
  </>
);

function handleSubmit(e, updateScores, _id) {
  e.preventDefault();

  const pointsPaul = +e.target.paul.value;
  const pointsCandidate = +e.target.candidate.value;

  updateScores({ _id, pointsPaul, pointsCandidate });
}

UpdateGames.propTypes = propTypes;

export default UpdateGames;
