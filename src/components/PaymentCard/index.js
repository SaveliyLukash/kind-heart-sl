import React from 'react';
import { Col, Form } from 'react-bootstrap';
import style from './PaymentCard.module.scss';

const PaymentСard = () => {
  return (
    <div
      className={`${style.paymentCard} justify-content-between d-flex flex-column`}
    >
      <div>
        <Form.Label className={style.labelWhite}>Номер картки</Form.Label>
        <div className="d-flex">
          <Form.Row className={style.formRow}>
            <Form.Group as={Col} controlId="card1">
              <Form.Control />
            </Form.Group>
            <Form.Group as={Col} controlId="card2">
              <Form.Control />
            </Form.Group>
            <Form.Group as={Col} controlId="card3">
              <Form.Control />
            </Form.Group>
            <Form.Group as={Col} controlId="card4">
              <Form.Control />
            </Form.Group>
          </Form.Row>
        </div>
      </div>
      <div
        className={`d-flex flex-row flex-nowrap justify-content-between ${style.secondRow}`}
      >
        <div>
          <Form.Label className={style.labelWhite}>Термін дії</Form.Label>
          <Form.Group as={Col} controlId="card1" className={style.formGroup}>
            <Form.Control />
          </Form.Group>
        </div>
        <div>
          <Form.Label className={style.labelWhite}>CVC/CVV</Form.Label>
          <Form.Group as={Col} controlId="card1" className={style.formGroup}>
            <Form.Control />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default PaymentСard;
