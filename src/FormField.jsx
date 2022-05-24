import React from "react";
import Form from "react-bootstrap/Form";
import { fieldHasError, errMsg } from "./utils";
const InputField = ({
  label,
  type,
  name,
  register,
  validationSyntax,
  helpText,
  errors
}) => (
  <>
    <Form.Group className="form-group mb-3" controlId={name}>
      <Form.Label>
        {label}
        {validationSyntax.required && <span className="text-red"> *</span>}
      </Form.Label>
      <Form.Control
        type={type}
        placeholder={"Enter " + label}
        {...register(name, validationSyntax)}
        className={fieldHasError(errors, name) ? "is-invalid" : ""}
      />
      {helpText && <Form.Text className="text-muted">{helpText} </Form.Text>}
      {errors[name] && (
        <small className="text-danger">{errMsg(errors, name)}</small>
      )}
    </Form.Group>
  </>
);
const SelectField = ({
  label,
  name,
  type,
  register,
  validationSyntax,
  helpText,
  options,
  defaultOption,
  multiple,
  errors
}) => (
  <>
    <Form.Group className="" controlId={name}>
      <Form.Label>
        {label}
        {validationSyntax.required && <span className=""> *</span>}
      </Form.Label>
      <Form.Select
        multiple={multiple}
        aria-label={`${label} -${multiple}`}
        {...register(name, validationSyntax)}
        className={
          fieldHasError(errors, name)
            ? "form-control is-invalid"
            : "form-control"
        }
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((item, i) => (
          <option key={`${i}-item`} value={item.key}>
            {item.text}
          </option>
        ))}
      </Form.Select>
      {helpText && <Form.Text className="text-muted">{helpText} </Form.Text>}
      {errors[name] && (
        <small className="text-danger">{errMsg(errors, name)}</small>
      )}
    </Form.Group>
  </>
);

export { InputField, SelectField };
