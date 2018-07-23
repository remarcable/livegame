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
  'announcement.template': String,
  'announcement.title': String,
  'announcement.body': String,
};
