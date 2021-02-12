import React from 'react';
import style from './TwoWaySwitch.module.scss';

const TwoWaySwitch = (props) => {
  const { leftText, rightText, isRightActive, toggle } = props;

  return (
    <div className={`${style.switchWrapper} d-flex flex-row`}>
      <div className={!isRightActive ? style.active : null} onClick={toggle}>
        {leftText}
      </div>
      <div className={isRightActive ? style.active : null} onClick={toggle}>
        {rightText}
      </div>
    </div>
  );
};

export default TwoWaySwitch;
