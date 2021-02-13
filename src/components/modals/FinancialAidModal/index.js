import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import {
  IoCloseOutline,
  IoHandRightOutline,
  IoHeartOutline,
  IoShirtOutline,
  IoWalletOutline,
} from 'react-icons/io5';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import TwoWaySwitch from '../../TwoWaySwitch';
import HelpTypeItem from '../../HelpTypeItem';
import PaymentTypeSelector from '../../PaymentTypeSelector';
import PaymentCard from '../../PaymentCard';
import style from './FinancialAidModal.module.scss';
import { HelpTypeContext } from '../../../contexts/HelpTypeContext';
import { PaymentTypeContext } from '../../../contexts/PaymentTypeContext';
import ControlledInput from '../../ControlledInput/ControlledInput';

const FinancialAidModal = (props) => {
  const { modalVisible, hideModal, setResQuery } = props;

  const [isJuridical, setIsJuridical] = useState(false);

  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return value;
    }

    return phoneNumber.formatInternational();
  };

  const normalizeZipCode = (value) => {
    return (
      value
        .replace(/\s/g, '')
        .match(/[0-9]{1,5}/g)
        ?.join('')
        .substr(0, 5) || ''
    );
  };

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^([^0-9]*)$/, "Ім'я не повинно містити у собі цифри.")
      .required("Будь ласка, вкажіть Ваше ім'я."),
    lastName: yup
      .string()
      .matches(/^([^0-9]*)$/, 'Фамілія не повинна містити у собі цифри.')
      .required('Будь ласка, вкажіть Вашу фамілію.'),
    companyName: yup.string(),
    email: yup
      .string()
      .email('Будь ласка, вкажіть вірний e-mail формат.')
      .required('Будь ласка, вкажіть Вашу e-mail адресу.'),
    phone: yup
      .string()
      .matches(
        /^(\+[0-9 ]+)$/,
        'Будь ласка, введь телефон у наступному форматі: +38098XXXXXXX'
      )
      .required('Будь ласка, вкажіть Ваш телефон.'),
    country: yup.string().required('Будь ласка, вкажіть Вашу країну.'),
    city: yup.string().required('Будь ласка, вкажіть Ваше місто.'),
    state: yup.string().required('Будь ласка, вкажіть Ваш регіон.'),
    address: yup.string().required('Будь ласка, вкажіть Вашу адресу.'),
    zip: yup
      .number()
      .typeError('Поштовий індекс може містити лише цифри.')
      .positive('Поштовий індекс може містити лише цифри.')
      .integer('Поштовий індекс може містити лише цифри.')
      .required('Будь ласка, вкажіть Ваш індекс.'),
    helpType: yup.number(),
    paymentType: yup.number(),
    expDate: yup.string().when('paymentType', {
      is: (value) => value === 0,
      then: yup
        .string()
        .matches(
          /^([0-1][0-9]\/[0-9][0-9])$/,
          'Будь ласка, вкажіть вірний exp. date'
        )
        .required('Будь ласка, вкажіть exp. date Вашої картки.'),
    }),
    cvv: yup.string().when('paymentType', {
      is: (value) => value === 0,
      then: yup
        .string()
        .matches(/^([0-9]{3})$/, 'CVV повинен містити 3 цифри.')
        .required('Будь ласка, вкажіть CVV Вашої картки.'),
    }),
    card_1: yup.string().when('paymentType', {
      is: (value) => value === 0,
      then: yup
        .string()
        .matches(/^([0-9]{4})$/, 'Номер картки повинен складатися із 16 цифр')
        .required('Будь ласка, вкажіть номер Вашої картки.'),
    }),
    card_2: yup.string().when('paymentType', {
      is: (value) => value === 0,
      then: yup
        .string()
        .matches(/^([0-9]{4})$/, 'Номер картки повинен складатися із 16 цифр')
        .required('Будь ласка, вкажіть номер Вашої картки.'),
    }),
    card_3: yup.string().when('paymentType', {
      is: (value) => value === 0,
      then: yup
        .string()
        .matches(/^([0-9]{4})$/, 'Номер картки повинен складатися із 16 цифр')
        .required('Будь ласка, вкажіть номер Вашої картки.'),
    }),
    card_4: yup.string().when('paymentType', {
      is: (value) => value === 0,
      then: yup
        .string()
        .matches(/^([0-9]{4})$/, 'Номер картки повинен складатися із 16 цифр')
        .required('Будь ласка, вкажіть номер Вашої картки.'),
    }),
  });

  const { control, handleSubmit, errors, setValue } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const processData = (data) => {
    const processedData = {
      ...data,
      card: data.card_1
        ? `${data.card_1}${data.card_2}${data.card_3}${data.card_4}`
        : undefined,
      logo: data.logo ? data.logo : undefined,
      phone: data?.phone?.replaceAll(' ', '')?.replaceAll('+', ''),
    };
    delete processedData.card_1;
    delete processedData.card_2;
    delete processedData.card_3;
    delete processedData.card_4;
    return processedData;
  };

  const [helpType, setHelpType] = useState(1);
  const [paymentType, setPaymentType] = useState(0);

  const [logoAttached, setLogoAttached] = useState(false);

  const onSubmit = (data) => {
    const processedData = processData(data);
    console.log(processedData);
    setResQuery(processedData);
    hideModal();
    setLogoAttached(false);
  };

  useEffect(() => {
    setValue('helpType', helpType);
  }, [helpType]);

  useEffect(() => {
    setValue('paymentType', paymentType);
  }, [paymentType]);

  return (
    <>
      <Modal show={modalVisible} onHide={() => {}} size="wide">
        <IoCloseOutline
          className={style.closeHandle}
          size={48}
          onClick={() => {
            hideModal();
          }}
        />
        <FormProvider
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="my-4 d-flex justify-content-xl-between flex-xl-nowrap justify-content-around flex-wrap">
              <div className={style.formColumn}>
                <div className="d-flex flex-column">
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Ім&apos;я</Form.Label>
                      <ControlledInput
                        control={control}
                        name="firstName"
                        errorMsg={errors?.firstName?.message}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Фамілія</Form.Label>
                      <ControlledInput
                        control={control}
                        name="lastName"
                        errorMsg={errors?.lastName?.message}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group
                    controlId="formGridOrg"
                    className={style.inputOrg}
                  >
                    <Form.Label>Назва компанії, організації</Form.Label>
                    <ControlledInput
                      control={control}
                      name="companyName"
                      errorMsg={errors?.companyName?.message}
                    />
                    <div
                      className={`${style.extraLogoDiv} ${
                        logoAttached ? style.changeLogoDiv : null
                      } d-flex flex-sm-column justify-content-xs-start flex-row justify-content-between`}
                    >
                      <div className={style.labelWrap}>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className={style.extraLogoLabel}>
                          <span id="extraLogoLabelText">
                            {logoAttached ? 'Змінити?' : '+ Логотип'}
                          </span>
                          <Controller
                            name="logo"
                            render={({
                              onChange,
                              onBlur,
                              value,
                              name,
                              ref,
                            }) => (
                              <input
                                className={style.extraLogoInput}
                                id="logoInput"
                                type="file"
                                accept=".jpg, .png, .jpeg, .gif|image/*"
                                onChange={(e) => {
                                  if (e.target.files.length !== 0) {
                                    setLogoAttached(true);
                                  } else {
                                    setLogoAttached(false);
                                  }
                                  onChange(e);
                                }}
                                onBlur={onBlur}
                                name={name}
                                ref={ref}
                                value={value}
                              />
                            )}
                          />
                        </label>
                      </div>
                      {logoAttached && (
                        <div
                          className={style.deleteLogoDiv}
                          onClick={() => {
                            setValue('logo', '');
                            setLogoAttached(false);
                          }}
                        >
                          Видалити!
                        </div>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Email-адреса</Form.Label>
                    <ControlledInput
                      control={control}
                      name="email"
                      errorMsg={errors?.email?.message}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridAddress2">
                    <Form.Label>Номер телефону</Form.Label>
                    <ControlledInput
                      control={control}
                      name="phone"
                      maskInput={normalizePhoneNumber}
                      errorMsg={errors?.phone?.message}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className={style.formColumn}>
                <div className="d-flex flex-column">
                  <Form.Group controlId="formGridAddress3">
                    <Form.Label>Країна</Form.Label>
                    <ControlledInput
                      control={control}
                      name="country"
                      errorMsg={errors?.country?.message}
                    />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail4">
                      <Form.Label>Місто</Form.Label>
                      <ControlledInput
                        control={control}
                        name="city"
                        errorMsg={errors?.city?.message}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword56">
                      <Form.Label>Штат, район</Form.Label>
                      <ControlledInput
                        control={control}
                        name="state"
                        errorMsg={errors?.state?.message}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formGridAddress78">
                    <Form.Label>Адреса</Form.Label>
                    <ControlledInput
                      control={control}
                      name="address"
                      errorMsg={errors?.address?.message}
                    />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail9">
                      <Form.Label>Поштовий індекс</Form.Label>
                      <ControlledInput
                        control={control}
                        name="zip"
                        errorMsg={errors?.zip?.message}
                        maskInput={normalizeZipCode}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail" />
                  </Form.Row>
                </div>
              </div>
            </div>

            <HelpTypeContext.Provider value={{ helpType, setHelpType }}>
              <h1 className="dark text-center mt-4">Види допомоги</h1>
              <p className="text-center subHeader">
                Ви можете змінити вид допомоги
              </p>
              <div
                className={`d-flex align-items-center justify-content-around mt-2 flex-wrap ${style.helpTypeWrapper}`}
              >
                <Controller name="helpType" defaultValue={helpType} />
                <HelpTypeItem caption="Зробити" helpTypeIndex={0}>
                  <IoHandRightOutline />
                </HelpTypeItem>
                <HelpTypeItem caption={'Фінансова\nдопомога'} helpTypeIndex={1}>
                  <IoWalletOutline />
                </HelpTypeItem>
                <HelpTypeItem
                  caption={'Матеріальна\nдопомога'}
                  helpTypeIndex={2}
                >
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
                      <Controller
                        name="paymentType"
                        defaultValue={paymentType}
                      />
                      <PaymentTypeSelector />
                    </div>
                    <div className={style.paymentCol2}>
                      {paymentType === 0 ? (
                        <>
                          <div className="mb-2 form-label">
                            Введіть наступні данні
                          </div>
                          <PaymentCard paymentType={paymentType} />
                        </>
                      ) : (
                        <div
                          className="h-100 d-flex flex-column justify-content-center"
                          style={{ marginRight: '6rem' }}
                        >
                          <div className="my-4">
                            Payment method #{paymentType}
                          </div>
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
                <Button variant="colorful" type="submit">
                  Допомогти
                </Button>
              </div>
            </HelpTypeContext.Provider>
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default FinancialAidModal;
