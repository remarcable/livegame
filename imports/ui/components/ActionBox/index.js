import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { withStyles } from '@material-ui/styles';

import Headline from '../Headline';
import Button from '../Button';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  additionalElement: PropTypes.node,
  className: PropTypes.string,
};

const ActionBox = ({
  classes,
  headline,
  text,
  buttonText,
  onButtonClick,
  buttonDisabled = false,
  additionalElement,
  className,
}) => (
  <div className={classnames(classes.wrapper, className)}>
    <Headline className={classes.headline}>{headline}</Headline>
    <span className={classes.text}>{text}</span>
    {additionalElement}
    {buttonText && onButtonClick && (
      <Button className={classes.button} disabled={buttonDisabled} onClick={onButtonClick}>
        {buttonText}
      </Button>
    )}
  </div>
);

ActionBox.propTypes = propTypes;

const styles = (theme) => ({
  wrapper: {
    position: 'relative',
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    width: 230, // together with padding = 250
    height: 230,
    minWidth: 230,
    minHeight: 230,
    backgroundColor: '#4EA1CA',
    boxShadow: theme.shadows[15],

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headline: {
    fontSize: 22,
    marginTop: 20,
    minHeight: 50,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    marginBottom: 5,
  },
});

export default withStyles(styles)(ActionBox);
