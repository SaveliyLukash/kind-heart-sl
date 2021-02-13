import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

/**
 * Controller + Form.Control
 * custom component by Savelii Lukash
 * @param props
 * @param props.control - control from useForm
 * @param props.name - a name of an input
 * @param props.maskInput - function that masks the input
 * @param props.errorMsg - error message to display
 */
const ControlledInput = (props) => {
  const { control, name, maskInput, errorMsg } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value, _name, ref }, { invalid }) => (
        <>
          <Form.Control
            onChange={(event) => {
              if (maskInput) {
                event.target.value = maskInput(event.target.value);
              }
              onChange(event);
            }}
            onBlur={onBlur}
            value={value}
            name={_name}
            ref={ref}
            isInvalid={invalid}
            {...props}
          />
          <Form.Control.Feedback type="invalid">
            {errorMsg}
          </Form.Control.Feedback>
        </>
      )}
    />
  );
};

export default ControlledInput;
