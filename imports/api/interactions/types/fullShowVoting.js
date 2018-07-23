import { hasOnlyAllowedFieldSet } from '/imports/api/helpers';

export const FULL_SHOW_VOTING = 'FULL_SHOW_VOTING';
export const FULL_SHOW_WAITING = 'FULL_SHOW_WAITING';

export const fullShowVotingSubSchema = {
  fullShowVoting: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: FULL_SHOW_VOTING, details: this });
    },
  },
  'fullShowVoting.question': String,
  'fullShowVoting.result': {
    type: String,
    optional: true,
    defaultValue: null,
  },
};
