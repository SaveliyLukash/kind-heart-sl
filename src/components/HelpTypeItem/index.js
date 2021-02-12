import React, { useContext } from 'react';
import style from './HelpTypeItem.module.scss';
import { HelpTypeContext } from '../../contexts/HelpTypeContext';

const HelpTypeItem = (props) => {
  const { children, caption, helpTypeIndex } = props;

  const { helpType, setHelpType } = useContext(HelpTypeContext);

  const activeStyle = helpType === helpTypeIndex ? style.active : null;

  return (
    <div
      className={`d-flex align-items-center mx-2 my-2 ${style.helpTypeItem} ${activeStyle}`}
      onClick={() => {
        setHelpType(helpTypeIndex);
      }}
    >
      <div className={style.iconWrapper}>{children}</div>
      <div className={style.caption}>{caption}</div>
    </div>
  );
};

export default HelpTypeItem;
