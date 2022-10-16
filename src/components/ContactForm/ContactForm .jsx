import React, { Component } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Form, Label, Field, Button } from './ContactForm-styled';
import * as yup from 'yup';
import PropTypes from 'prop-types';

yup.addMethod(yup.string, 'numeric', function () {
  return this.matches(/^\d+$/, 'The field should have digits only');
});

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  number: yup.string().numeric().min(12).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    const contacts = this.props.contacts;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      alert(`${values.name} is already in contacts.`);
      return;
    }
    this.props.onSubmit(values);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
      >
        <Form>
          <Label>
            Name
            <Field
              type="text"
              name="name"
              placeholder="Enter your name..."
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </Label>
          <ErrorMessage name="name" component="div" />
          <Label>
            Phone-number
            <Field
              type="tel"
              name="number"
              placeholder="Enter your tel..."
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </Label>
          <ErrorMessage name="number" component="div" />
          <Button type="submit">Add contact</Button>
        </Form>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};
