import React from 'react';
import PropTypes from 'prop-types';

import SimpleSchema from 'simpl-schema';
import AutoForm from 'uniforms-material/AutoForm';

// material-ui
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const propTypes = {
  candidates: PropTypes.array.isRequired, // TODO: better type
  insertCandidate: PropTypes.func.isRequired,
  updateCandidate: PropTypes.func.isRequired,
  removeCandidate: PropTypes.func.isRequired,
  setCandidate: PropTypes.func.isRequired,
};

const schema = new SimpleSchema({
  name: { type: String, label: 'Name' },
  imageUrl: { type: String, label: 'Bild-URL', regEx: SimpleSchema.RegEx.Url },
});


class EditDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <IconButton aria-label="Bearbeiten" onClick={this.handleClickOpen}>
          <EditIcon fontSize="large" />
        </IconButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Bearbeiten</DialogTitle>
          {this.props.children}

          {/*<DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>*/}
        </Dialog>
      </>
    );
  }
}

// Todo: after inserting candidate, clear the form
const EditCandidates = ({
  classes,
  candidates,
  insertCandidate,
  updateCandidate,
  removeCandidate,
  setCandidate,
}) => (
  <div>
    <h1>Candidates</h1>
    <h2>Neuer Kandidat</h2>
    <AutoForm schema={schema} onSubmit={(data) => insertCandidate(data)} />

    {candidates.map(({ _id, name, imageUrl, candidateNumber }) => (
      <p>
        {`${candidateNumber ? `Kandidat Nr. ${candidateNumber} ` : ''}${name}`}
        <EditDialog key={_id}>
          <div style={{ marginTop: 30 }} />
          <h2>{`${candidateNumber ? `Kandidat Nr. ${candidateNumber} ` : ''}${name}`}</h2>

          <Button onClick={() => setCandidate({ _id, candidateNumber: 1 })}>Candidate 1</Button>
          <Button onClick={() => setCandidate({ _id, candidateNumber: 2 })}>Candidate 2</Button>
          <IconButton aria-label="Delete" className={classes.button} onClick={() => removeCandidate({ _id })}>
            <DeleteIcon fontSize="large" />
          </IconButton>

          <AutoForm
            schema={schema}
            onSubmit={(data) => updateCandidate({ _id, ...data })}
            model={{ name, imageUrl }}
          />
        </EditDialog>
      </p>
    ))}
  </div>
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});


EditCandidates.propTypes = propTypes;

export default withStyles(styles)(EditCandidates);
