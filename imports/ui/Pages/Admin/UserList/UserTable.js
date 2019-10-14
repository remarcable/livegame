import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';
import RemoveIcon from '@material-ui/icons/Remove';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SaveIcon from '@material-ui/icons/SaveAlt';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

import MaterialTable from 'material-table';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  flagNames: PropTypes.array.isRequired, // TODO: better type
};

const UserTable = ({ isLoading, classes, users, flagNames }) => (
  <div className={classes.wrapper}>
    <MaterialTable
      columns={getColumns(flagNames)}
      data={users}
      isLoading={isLoading}
      title="Spielerliste"
      options={options}
      localization={localization}
      icons={icons}
    />
  </div>
);

const getColumns = (flagNames) => [
  { title: 'ID', field: '_id', hidden: true },
  { title: 'Vorname', field: 'firstName' },
  { title: 'Nachname', field: 'lastName' },
  { title: 'Alias', field: 'alias', emptyValue: '-', hidden: true },
  { title: 'E-Mail', field: 'email', emptyValue: '-' },
  { title: 'Newsletter', field: 'newsletter', type: 'boolean' },
  { title: 'Full Show Rang', field: 'fullShowRank', type: 'numeric' },
  { title: 'Full Show Punkte', field: 'fullShowScore', type: 'numeric' },
  { title: 'Schätzen Rang', field: 'estimationGame.rank', type: 'numeric' },
  { title: 'Schätzen Punkte', field: 'estimationGame.points', type: 'numeric' },
  ...flagNames.map((name) => ({
    title: name,
    field: `flags.${name}`,
    type: 'boolean',
  })),
];

const options = {
  pageSize: 20,
  columnsButton: true,
  pageSizeOptions: [20, 50, 100, 200, 500],
  maxBodyHeight: '80vh',
  exportButton: true,
  exportAllData: true,
  exportFileName: 'WBP Live User Data',
  padding: 'dense',
  showEmptyDataSourceMessage: true,
  searchFieldAlignment: 'left',
};

const icons = {
  Check: CheckIcon,
  SortArrow: ArrowUpwardIcon,
  Search: SearchIcon,
  ResetSearch: ClearIcon,
  ThirdStateCheck: RemoveIcon,
  FirstPage: FirstPageIcon,
  LastPage: LastPageIcon,
  NextPage: ChevronRightIcon,
  PreviousPage: ChevronLeftIcon,
  Export: SaveIcon,
  ViewColumn: ViewColumnIcon,
};

const localization = {
  body: {
    emptyDataSourceMessage: 'Keine Spieler gefunden',
  },
  pagination: {
    labelDisplayedRows: '{from}-{to} von {count}',
    labelRowsSelect: 'Einträge',
    labelRowsPerPage: 'Einträge pro Seite',
    firstTooltip: 'Erste Seite',
    previousTooltip: 'Zurück',
    nextTooltip: 'Vor',
    lastTooltip: 'Letzte Seite',
  },
  toolbar: {
    addRemoveColumns: 'Spalten hinzufügen oder entfernen',
    showColumnsTitle: 'Spalten auswählen',
    exportTitle: 'Exportieren',
    exportName: 'Als CSV exportieren',
    searchTooltip: 'Suche',
    searchPlaceholder: 'Suchbegriff...',
  },
};

UserTable.propTypes = propTypes;

const styles = {
  wrapper: {
    width: '95%',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    overflow: 'scroll',
    fontFamily: 'Roboto Condensed',
  },
};

export default withStyles(styles)(UserTable);
