import React from 'react';
import { Col, Form } from 'react-bootstrap';
// import * as yup from 'yup';
import style from './PaymentCard.module.scss';

const PaymentCard = () => {
  return (
    <div
      className={`${style.paymentCard} justify-content-between d-flex flex-column`}
    >
      <Form>
        <Form.Label className={style.labelWhite}>Номер картки</Form.Label>
        <div className="d-flex">
          <Form.Row className={style.formRow}>
            <Form.Group as={Col} controlId="card1">
              <Form.Control
                className={style.formControl}
                maxlength={4}
                name="card1"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="card2">
              <Form.Control
                className={style.formControl}
                maxlength={4}
                name="card2"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="card3">
              <Form.Control
                className={style.formControl}
                maxlength={4}
                name="card3"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="card4">
              <Form.Control
                className={style.formControl}
                maxlength={4}
                name="card4"
              />
            </Form.Group>
          </Form.Row>
        </div>
      </Form>
      <div
        className={`d-flex flex-row flex-nowrap justify-content-between ${style.secondRow}`}
      >
        <div>
          <Form.Label className={style.labelWhite}>Термін дії</Form.Label>
          <Form.Group as={Col} controlId="card1" className={style.formGroup}>
            <Form.Control
              className={style.formControl}
              name="expDate"
              maxlength={5}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Label className={style.labelWhite}>CVC/CVV</Form.Label>
          <Form.Group as={Col} controlId="card1" className={style.formGroup}>
            <Form.Control
              className={style.formControl}
              name="cvv"
              maxlength={3}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
