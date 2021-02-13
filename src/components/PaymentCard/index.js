import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import style from './PaymentCard.module.scss';
import ControlledInput from '../ControlledInput/ControlledInput';

const PaymentCard = () => {
  const { control, errors } = useFormContext();

  const normalizeCardExpDate = (value) => {
    return (
      value
        .replace(/\s/g, '')
        .match(/[0-9]{1,2}/g)
        ?.join('/')
        .substr(0, 5) || ''
    );
  };

  const normalizeCVV = (value) => {
    return (
      value
        .replace(/\s/g, '')
        .match(/[0-9]{1,3}/g)
        ?.join('')
        .substr(0, 3) || ''
    );
  };

  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, '')
        .match(/[0-9]{1,4}/g)
        ?.join('')
        .substr(0, 4) || ''
    );
  };

  const handleCardFieldsChange = (event) => {
    if (!event.target.classList.contains('input-chain')) {
      return;
    }

    const { maxLength, value, name } = event.target;
    const [, fieldIndexString] = name.split('_');
    const fieldIndex = parseInt(fieldIndexString, 10);

    if (value.length >= maxLength) {
      if (fieldIndex < 4) {
        const nextSibling = document.querySelector(
          `input[name=card_${fieldIndex + 1}]`
        );
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }

    if (value.length === 0) {
      if (fieldIndex > 0) {
        const prevSibling = document.querySelector(
          `input[name=card_${fieldIndex - 1}]`
        );
        if (prevSibling !== null) {
          prevSibling.focus();
          prevSibling.setSelectionRange(maxLength, maxLength);
        }
      }
    }
  };

  const resetInvalidStyle = {
    backgroundImage: 'none',
    padding: '0.375rem 0.75rem',
  };

  return (
    <div
      className={`${style.paymentCard} justify-content-between d-flex flex-column`}
    >
      <Form>
        <Form.Label className={style.labelWhite}>Номер картки</Form.Label>
        <div className="d-flex flex-column">
          <Form.Row
            className={style.formRow}
            onChange={handleCardFieldsChange}
            // onClick={handleCardFieldsClick}
          >
            <Form.Group as={Col} controlId="card1">
              <ControlledInput
                control={control}
                className="input-chain"
                maxlength={4}
                name="card_1"
                maskInput={normalizeCardNumber}
                extraOnChange={handleCardFieldsChange}
                style={resetInvalidStyle}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="card2">
              <ControlledInput
                control={control}
                className="input-chain"
                maxlength={4}
                name="card_2"
                maskInput={normalizeCardNumber}
                extraOnChange={handleCardFieldsChange}
                style={resetInvalidStyle}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="card3">
              <ControlledInput
                control={control}
                className="input-chain"
                maxlength={4}
                name="card_3"
                maskInput={normalizeCardNumber}
                extraOnChange={handleCardFieldsChange}
                style={resetInvalidStyle}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="card4">
              <ControlledInput
                control={control}
                className="input-chain"
                maxlength={4}
                name="card_4"
                maskInput={normalizeCardNumber}
                extraOnChange={handleCardFieldsChange}
                style={resetInvalidStyle}
              />
            </Form.Group>
          </Form.Row>
          <Form.Control.Feedback
            type="invalid"
            style={{ display: 'inline-block' }}
          >
            {errors?.card_1?.message ||
              errors?.card_2?.message ||
              errors?.card_3?.message ||
              errors?.card_4?.message}
          </Form.Control.Feedback>
        </div>
      </Form>
      <div
        className={`d-flex flex-row flex-nowrap justify-content-between ${style.secondRow}`}
      >
        <div>
          <Form.Label className={style.labelWhite}>Термін дії</Form.Label>
          <Form.Group as={Col} controlId="card1" className={style.formGroup}>
            <ControlledInput
              control={control}
              name="expDate"
              maxlength={5}
              maskInput={normalizeCardExpDate}
              errorMsg={errors?.expDate?.message}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Label className={style.labelWhite}>CVC/CVV</Form.Label>
          <Form.Group as={Col} controlId="card2" className={style.formGroup}>
            <ControlledInput
              name="cvv"
              control={control}
              maxlength={3}
              maskInput={normalizeCVV}
              errorMsg={errors?.cvv?.message}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
