import React from 'react';
import style from './PaymentTypeItem.module.scss';

const PaymentTypeItem = (props) => {
  const { active, caption, image } = props;

  const activeStyle = active ? style.active : null;

  return (
    <div className={`${style.paymentTypeItem} ${activeStyle}`}>
      <div
        className={style.logo}
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className={style.caption}>{caption}</div>
    </div>
  );
};

export default PaymentTypeItem;
