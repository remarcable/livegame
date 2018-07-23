import * as interactionTypes from '/imports/api/interactions/interactionTypes';

import FullShowVoting from './FullShowVoting';
import FullShowWaiting from './FullShowWaiting';

import EstimationGame from './EstimationGame';
import EstimationVoting from './EstimationVoting';
import EstimationWaiting from './EstimationWaiting';
import EstimationEnded from './EstimationEnded';

import Announcement from './Announcement';

const interactionsMap = new Map([
  [interactionTypes.FULL_SHOW_VOTING, FullShowVoting],
  [interactionTypes.FULL_SHOW_WAITING, FullShowWaiting],

  [interactionTypes.ESTIMATION_GAME, EstimationGame],
  [interactionTypes.ESTIMATION_VOTING, EstimationVoting],
  [interactionTypes.ESTIMATION_WAITING, EstimationWaiting],
  [interactionTypes.ESTIMATION_ENDED, EstimationEnded],

  [interactionTypes.ANNOUNCEMENT, Announcement],
]);

const Interactions = ({ type }) => interactionsMap.get(type);

export default Interactions;
