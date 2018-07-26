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
  'fullShowVoting.question': {
    type: String,
    label: 'Frage',
  },
  'fullShowVoting.result': {
    type: String,
    label: 'Ergebnis',
    optional: true,
    defaultValue: null,
  },
};
