import React from 'react';
import style from './HelpTypeItem.module.scss';

const HelpTypeItem = (props) => {
  const { children, caption, active } = props;

  const activeStyle = active ? style.active : null;

  return (
    <div
      className={`d-flex align-items-center mx-2 ${style.helpTypeItem} ${activeStyle}`}
    >
      <div className={style.iconWrapper}>{children}</div>
      <div className={style.caption}>{caption}</div>
    </div>
  );
};

export default HelpTypeItem;
