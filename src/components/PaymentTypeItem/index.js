import React, { useContext } from 'react';
import style from './PaymentTypeItem.module.scss';
import { PaymentTypeContext } from '../../contexts/PaymentTypeContext';

const PaymentTypeItem = (props) => {
  const { paymentTypeIndex, caption, image } = props;

  const { paymentType, setPaymentType } = useContext(PaymentTypeContext);

  const activeStyle = paymentType === paymentTypeIndex ? style.active : null;

  return (
    <div
      className={`${style.paymentTypeItem} ${activeStyle}`}
      onClick={() => {
        setPaymentType(paymentTypeIndex);
      }}
    >
      <div
        className={style.logo}
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className={style.caption}>{caption}</div>
    </div>
  );
};

export default PaymentTypeItem;
