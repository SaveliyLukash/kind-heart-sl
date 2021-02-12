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
      />
      <PaymentTypeItem active caption="Приват24" image={Privat24Logo} />
      <PaymentTypeItem caption="Термінали України" image={TerminalsLogo} />
      <PaymentTypeItem caption="WebMoney" image={WebmoneyLogo} />
      <PaymentTypeItem caption="PayPal" image={PayPalLogo} />
    </div>
  );
};

export default PaymentTypeSelector;
