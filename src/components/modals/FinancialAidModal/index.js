import React, { useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import {
  IoHandRightOutline,
  IoHeartOutline,
  IoShirtOutline,
  IoWalletOutline,
  IoCloseOutline,
} from 'react-icons/io5';
// import * as yup from 'yup';

import TwoWaySwitch from '../../TwoWaySwitch';
import HelpTypeItem from '../../HelpTypeItem';
import PaymentTypeSelector from '../../PaymentTypeSelector';
import PaymentCard from '../../PaymentCard';
import style from './FinancialAidModal.module.scss';
import { HelpTypeContext } from '../../../contexts/HelpTypeContext';
import { PaymentTypeContext } from '../../../contexts/PaymentTypeContext';

const FinancialAidModal = () => {
  const [isJuridical, setIsJuridical] = useState(false);
  // const toggleIsJuridical = () => {
  //   setIsJuridical((prevState) => !prevState);
  // };

  const [helpType, setHelpType] = useState(1);
  const [paymentType, setPaymentType] = useState(0);

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal show={modalVisible} onHide={() => {}} size="wide">
      <IoCloseOutline
        className={style.closeHandle}
        size={48}
        onClick={() => {
          setModalVisible(false);
        }}
      />
      <h1 className="dark text-center mt-3">Заповніть форму</h1>
      <div className="d-flex justify-content-center mt-3 mb-1">
        <TwoWaySwitch
          leftText="Фіз. особа"
          rightText="Юр. особа"
          leftOnClick={() => {
            setIsJuridical(false);
          }}
          rightOnClick={() => {
            setIsJuridical(true);
          }}
          isRightActive={isJuridical}
        />
      </div>
      <Form>
        <div className="my-4 d-flex justify-content-xl-between flex-xl-nowrap justify-content-around flex-wrap">
          <div className={style.formColumn}>
            <div className="d-flex flex-column">
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Ім&apos;я</Form.Label>
                  <Form.Control name="firstName" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Фамілія</Form.Label>
                  <Form.Control name="lastName" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridOrg">
                <Form.Label>Назва компанії, організації</Form.Label>
                <Form.Control name="companyName" />
                <div className={style.extraLogoDiv}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className={style.extraLogoLabel}>
                    +&nbsp;Логотип
                    <input className={style.extraLogoInput} type="file" />
                  </label>
                </div>
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Email-адреса</Form.Label>
                <Form.Control name="email" />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Номер телефону</Form.Label>
                <Form.Control name="phone" maxlength={12} />
              </Form.Group>
            </div>
          </div>
          <div className={style.formColumn}>
            <div className="d-flex flex-column">
              <Form.Group controlId="formGridAddress3">
                <Form.Label>Країна</Form.Label>
                <Form.Control name="country" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail4">
                  <Form.Label>Місто</Form.Label>
                  <Form.Control name="city" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword56">
                  <Form.Label>Штат, район</Form.Label>
                  <Form.Control name="state" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress78">
                <Form.Label>Адреса</Form.Label>
                <Form.Control name="address" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail9">
                  <Form.Label>Поштовий індекс</Form.Label>
                  <Form.Control name="zip" maxlength={8} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail" />
              </Form.Row>
            </div>
          </div>
        </div>
      </Form>
      <HelpTypeContext.Provider value={{ helpType, setHelpType }}>
        <h1 className="dark text-center mt-4">Види допомоги</h1>
        <p className="text-center subHeader">Ви можете змінити вид допомоги</p>
        <div
          className={`d-flex align-items-center justify-content-around mt-2 flex-wrap ${style.helpTypeWrapper}`}
        >
          <HelpTypeItem caption="Зробити" helpTypeIndex={0}>
            <IoHandRightOutline />
          </HelpTypeItem>
          <HelpTypeItem caption={'Фінансова\nдопомога'} helpTypeIndex={1}>
            <IoWalletOutline />
          </HelpTypeItem>
          <HelpTypeItem caption={'Матеріальна\nдопомога'} helpTypeIndex={2}>
            <IoShirtOutline />
          </HelpTypeItem>
          <HelpTypeItem caption="Волонтерство" helpTypeIndex={3}>
            <IoHeartOutline />
          </HelpTypeItem>
        </div>
        {helpType === 1 ? (
          <div
            className={`mt-2 mb-4 d-flex justify-content-xl-between justify-content-center flex-wrap flex-xl-nowrap ${style.paymentWrapper}`}
          >
            <PaymentTypeContext.Provider
              value={{ paymentType, setPaymentType }}
            >
              <div className={style.paymentCol1}>
                <div className="mb-2 form-label">Спосіб оплати</div>
                <PaymentTypeSelector />
              </div>
              <div className={style.paymentCol2}>
                {paymentType === 0 ? (
                  <>
                    <div className="mb-2 form-label">
                      Введіть наступні данні
                    </div>
                    <PaymentCard />
                  </>
                ) : (
                  <div
                    className="h-100 d-flex flex-column justify-content-center"
                    style={{ marginRight: '6rem' }}
                  >
                    <div className="my-4">Payment method #{paymentType}</div>
                  </div>
                )}
              </div>
            </PaymentTypeContext.Provider>
          </div>
        ) : (
          <div
            className={`mt-2 mb-4 d-flex justify-content-between ${style.paymentWrapper}`}
            style={{ height: '264px' }}
          >
            <div style={{ margin: 'auto' }}>
              You are currently on tab #{helpType}
            </div>
          </div>
        )}
        <div
          className="mt-4 d-flex justify-content-center"
          style={{ marginBottom: '4rem' }}
        >
          <Button variant="colorful">Допомогти</Button>
        </div>
      </HelpTypeContext.Provider>
    </Modal>
  );
};

export default FinancialAidModal;
