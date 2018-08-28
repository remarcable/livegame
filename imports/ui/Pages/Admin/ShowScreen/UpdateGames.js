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
            name="candidate1"
            placeholder="Punkte Kandidat 1"
            defaultValue={fullShowGame.pointsCandidate1}
          />
          <input
            type="number"
            name="candidate2"
            placeholder="Punkte Kandidat 2"
            defaultValue={fullShowGame.pointsCandidate2}
          />
          <input type="submit" />
          <button
            disabled={fullShowGame.winner === 'CANDIDATE1'}
            onClick={() => setWinner({ _id, winner: 'CANDIDATE1' })}
          >
            Kandidat 1
          </button>
          <button
            disabled={fullShowGame.winner === 'CANDIDATE2'}
            onClick={() => setWinner({ _id, winner: 'CANDIDATE2' })}
          >
            Kandidat 2
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

  const pointsCandidate1 = +e.target.candidate1.value;
  const pointsCandidate2 = +e.target.candidate2.value;

  updateScores({ _id, pointsCandidate1, pointsCandidate2 });
}

UpdateGames.propTypes = propTypes;

export default UpdateGames;
