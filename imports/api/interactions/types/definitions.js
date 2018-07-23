import { ANNOUNCEMENT, announcementSubSchema } from './announcement';
import { FULL_SHOW_VOTING, FULL_SHOW_WAITING, fullShowVotingSubSchema } from './fullShowVoting';
import {
  ESTIMATION_GAME,
  ESTIMATION_VOTING,
  ESTIMATION_WAITING,
  ESTIMATION_ENDED,
  estimationGameSubSchema,
  estimationVotingSubSchema,
} from './estimation';

// mapping interactionTypes to their subSchemas,
// empty object if there's no schema for this type
const interactionTypeToSubSchema = new Map([
  [ANNOUNCEMENT, announcementSubSchema],

  [FULL_SHOW_VOTING, fullShowVotingSubSchema],
  [FULL_SHOW_WAITING, {}],

  [ESTIMATION_GAME, estimationGameSubSchema],
  [ESTIMATION_VOTING, estimationVotingSubSchema],
  [ESTIMATION_WAITING, {}],
  [ESTIMATION_ENDED, {}],

  [ANNOUNCEMENT, announcementSubSchema],
]);

// convert (the MapIterable) interactionTypeToSubSchema.keys() to an array
// and create object that looks like { ANNOUNCEMENT: ANNOUNCEMENT, ... }
export const interactionTypes = [...interactionTypeToSubSchema.keys()].reduce(
  (obj, type) => ({ ...obj, [type]: type }),
  {},
);

export default interactionTypeToSubSchema;
