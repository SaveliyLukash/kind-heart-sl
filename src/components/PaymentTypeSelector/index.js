import React from 'react';
import style from './PaymentTypeSelector.module.scss';
import PaymentTypeItem from '../PaymentTypeItem';
import WebmoneyLogo from '../../images/logos/webmoney-logo.png';
import Privat24Logo from '../../images/logos/privat24-logo.png';
import VisaMastercardLogos from '../../images/logos/visa-mastercard-logos.png';
import PayPalLogo from '../../images/logos/paypal-logo.png';
import TerminalsLogo from '../../images/logos/terminals-logo.png';

const PaymentTypeSelector = () => {
  return (
    <div
      className={`${style.paymentTypeSelector} d-flex flex-wrap align-items-center`}
    >
      <PaymentTypeItem
        caption="Карта Visa/MasterCard"
        image={VisaMastercardLogos}
        paymentTypeIndex={0}
      />
      <PaymentTypeItem
        active
        caption="Приват24"
        image={Privat24Logo}
        paymentTypeIndex={1}
      />
      <PaymentTypeItem
        caption="Термінали України"
        image={TerminalsLogo}
        paymentTypeIndex={2}
      />
      <PaymentTypeItem
        caption="WebMoney"
        image={WebmoneyLogo}
        paymentTypeIndex={3}
      />
      <PaymentTypeItem
        caption="PayPal"
        image={PayPalLogo}
        paymentTypeIndex={4}
      />
    </div>
  );
};

export default PaymentTypeSelector;
