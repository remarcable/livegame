import React from 'react';
import HeartIcon from 'material-ui/svg-icons/action/favorite';

const heartStyle = {
  width: '4em',
  height: '4em',
  top: 0,
  left: 0,
};

const heartAnimationStyle = {
  position: 'absolute',
  animation: 'pop-out 5s infinite cubic-bezier(0.23, 1, 0.32, 1)',
};

const HeartAnimation = () => (
  <div style={{ position: 'relative' }}>
    <HeartIcon style={heartStyle} />
    <HeartIcon style={{ ...heartStyle, ...heartAnimationStyle }} />
  </div>
);

export default HeartAnimation;
