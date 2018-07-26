import { hasOnlyAllowedFieldSet } from '/imports/api/helpers';

export const ANNOUNCEMENT = 'ANNOUNCEMENT';

export const announcementSubSchema = {
  announcement: {
    type: Object,
    optional: true,
    custom() {
      return hasOnlyAllowedFieldSet({ forType: ANNOUNCEMENT, details: this });
    },
  },
  'announcement.template': {
    type: String,
    label: 'Template',
  },
  'announcement.title': {
    type: String,
    label: 'Titel',
  },
  'announcement.body': {
    type: String,
    label: 'Body',
  },
};
