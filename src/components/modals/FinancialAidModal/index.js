import React, { useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import {
  IoHandRightOutline,
  IoHeartOutline,
  IoShirtOutline,
  IoWalletOutline,
} from 'react-icons/io5';
import TwoWaySwitch from '../../TwoWaySwitch';
import HelpTypeItem from '../../HelpTypeItem';
import PaymentTypeSelector from '../../PaymentTypeSelector';
import PaymentCard from '../../PaymentCard';
import style from './FinancialAidModal.module.scss';

const FinancialAidModal = () => {
  const [isJuridical, setIsJuridical] = useState(false);
  const toggleIsJuridical = () => {
    setIsJuridical((prevState) => !prevState);
  };

  return (
    <Modal show={1} size="wide">
      <h1 className="dark text-center mt-3">Заповніть форму</h1>
      <div className="d-flex justify-content-center mt-3 mb-1">
        <TwoWaySwitch
          leftText="Фіз. особа"
          rightText="Юр. особа"
          isRightActive={isJuridical}
          toggle={toggleIsJuridical}
        />
      </div>
      <div className="my-4 d-flex justify-content-xl-between flex-xl-nowrap justify-content-around flex-wrap">
        <div className={style.formColumn}>
          <Form className="d-flex flex-column">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Ім&apos;я</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Фамілія</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridOrg">
              <Form.Label>Назва компанії, організації</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Email-адреса</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Номер телефону</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form>
        </div>
        <div className={style.formColumn}>
          <Form className="d-flex flex-column">
            <Form.Group controlId="formGridAddress3">
              <Form.Label>Країна</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail4">
                <Form.Label>Місто</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword56">
                <Form.Label>Штат, район</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress78">
              <Form.Label>Адреса</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail9">
                <Form.Label>Поштовий індекс</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail" />
            </Form.Row>
          </Form>
        </div>
      </div>
      <h1 className="dark text-center mt-4">Види допомоги</h1>
      <p className="text-center subHeader">Ви можете змінити вид допомоги</p>
      <div className="d-flex align-items-center justify-content-around mt-4">
        <HelpTypeItem caption="Зробити">
          <IoHandRightOutline />
        </HelpTypeItem>
        <HelpTypeItem active caption={'Фінансова\nдопомога'}>
          <IoWalletOutline />
        </HelpTypeItem>
        <HelpTypeItem caption={'Матеріальна\nдопомога'}>
          <IoShirtOutline />
        </HelpTypeItem>
        <HelpTypeItem caption="Волонтерство">
          <IoHeartOutline />
        </HelpTypeItem>
      </div>
      <div
        className="my-4 d-flex justify-content-between"
        style={{
          border: '2px solid #c5d5e6',
          borderRadius: '1rem',
          padding: '0.75rem 1.25rem',
        }}
      >
        <div>
          <div className="mb-2 form-label">Спосіб оплати</div>
          <PaymentTypeSelector />
        </div>
        <div>
          <div className="mb-2 form-label">Введіть наступні данні</div>
          <PaymentCard />
        </div>
      </div>
      <div
        className="mt-4 d-flex justify-content-center"
        style={{ marginBottom: '4rem' }}
      >
        <Button variant="colorful">Допомогти</Button>
      </div>
    </Modal>
  );
};

export default FinancialAidModal;
