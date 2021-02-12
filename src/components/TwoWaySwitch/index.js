import React from 'react';
import style from './TwoWaySwitch.module.scss';

const TwoWaySwitch = (props) => {
  const {
    leftText,
    rightText,
    isRightActive,
    leftOnClick,
    rightOnClick,
  } = props;

  return (
    <div className={`${style.switchWrapper} d-flex flex-row`}>
      <div
        className={!isRightActive ? style.active : null}
        onClick={leftOnClick}
      >
        {leftText}
      </div>
      <div
        className={isRightActive ? style.active : null}
        onClick={rightOnClick}
      >
        {rightText}
      </div>
    </div>
  );
};

export default TwoWaySwitch;
