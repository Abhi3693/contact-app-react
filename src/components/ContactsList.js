import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import useFetch from '../customHooks/useFetch';
import { CONTACTS_URL } from '../utils/constants';

let schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'Min 3 characters are required'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Min 3 characters are required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\d+$/, 'Phone should only contain numbers')
    .min(10, 'Phone should have 10 digits')
    .max(10, 'Phone should have 10 digits'),
});

const DEFAULT_FORM_VALUES = {
  firstName: '',
  lastName: '',
  phone: '',
};

const DEFAULT_API_ERRORS = {
  addContact: '',
  fetchContacts: '',
};

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [apiError, setAPIError] = useState(DEFAULT_API_ERRORS);
  const [isValidating, setValidating] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { makeApiCall, isLoading } = useFetch();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (isValidating) performValidation();
  }, [formValues]);

  // Validation
  const resetValidationErrors = () => {
    setFormErrors({});
  };

  const performValidation = (successCallback = null) => {
    schema
      .validate(formValues, { abortEarly: false })
      .then((values) => {
        resetValidationErrors();
        if (successCallback) {
          successCallback(values);
        }
      })
      .catch((err) => {
        const errors = {};

        err.inner.forEach((e) => {
          if (!errors[e.path]) {
            errors[e.path] = e.errors[0];
          }
        });

        setFormErrors(errors);
      });
  };

  const validateForm = (event) => {
    event.preventDefault();
    setValidating(true);
    setAPIError(DEFAULT_API_ERRORS);
    performValidation(handleSubmit);
  };

  const fetchContacts = async () => {
    let response = await makeApiCall(CONTACTS_URL);
    if (response.error) {
      setAPIError({ ...apiError, fetchContacts: response.error });
    } else {
      setContacts(response.contacts);
      resetValidationErrors();
    }
  };

  const handleAddContact = async (url, method, body) => {
    let response = await makeApiCall(url, method, body);
    if (response.error) {
      setAPIError({ ...apiError, addContact: response.error });
    } else {
      fetchContacts();
    }
  };

  const handleSubmit = ({ firstName, lastName, phone }) => {
    handleAddContact(
      CONTACTS_URL,
      'POST',
      JSON.stringify({ contact: { firstName, lastName, phone } })
    );
    setValidating(false);
    setFormValues(DEFAULT_FORM_VALUES);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setAPIError(DEFAULT_API_ERRORS);
    setFormValues({ ...formValues, [name]: value });
  };

  if (isLoading) {
    return <h1 className='text-center text-success my-5'>Loading...</h1>;
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <form
            method='POST'
            action='/api/contacts'
            className='row g-3 border border-4 p-3 pb-5 mt-4'
            onSubmit={validateForm}
          >
            <h2 className='text-center text-secondary'>Add Contact Info</h2>
            <p className='my-2 text-danger text-center'>
              {apiError.addContact ? apiError.addContact : ''}
            </p>
            <div className='col-md-12'>
              <label htmlFor='inputEmail4' className='form-label'>
                First Name
              </label>
              <input
                type='text'
                className='form-control'
                name='firstName'
                id='inputEmail4'
                onChange={handleChange}
                value={formValues.firstName}
              />
              <FormValidationError error={formErrors?.firstName} />
            </div>
            <div className='col-md-12'>
              <label htmlFor='inputPassword4' className='form-label'>
                Last Name
              </label>
              <input
                type='text'
                className='form-control'
                name='lastName'
                id='inputPassword4'
                onChange={handleChange}
                value={formValues.lastName}
              />
              <FormValidationError error={formErrors?.lastName} />
            </div>
            <div className='col-md-12'>
              <label htmlFor='inputEmai' className='form-label'>
                Phone
              </label>
              <input
                type='text'
                className='form-control'
                name='phone'
                id='inputEmai'
                onChange={handleChange}
                value={formValues.phone}
              />
              <FormValidationError error={formErrors?.phone} />
            </div>
            <div className='col-md-12'>
              <button type='submit' className='btn btn-primary'>
                Add Contact
              </button>
            </div>
          </form>
        </div>
        <div className='col-lg-6 col-md-12 col-sm-12 border border-4 my-4 m-0'>
          <h2 className='text-center my-3 text-secondary'>Contact list</h2>
          <p className='my-2 text-danger text-center'>
            {apiError.fetchContacts ? apiError.fetchContacts : ''}
          </p>
          {contacts.length ? (
            <ul className='row list'>
              {contacts.map((contact, index) => {
                return (
                  <li
                    key={contact._id}
                    className='col-10 mx-auto mb-2 p-3 border-bottom bg-light'
                  >
                    <Link
                      to={'/contacts/' + contact._id}
                      className='font-monospace contact'
                    >
                      {`${index + 1}. ${contact.firstName} ${contact.lastName}`}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span key='no' className='d-block col-10 mx-auto p-3 my-5 bg-light'>
              No any contact..
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const FormValidationError = ({ error }) => {
  if (!error) return null;
  return <p className='my-2 text-danger'>{error}</p>;
};

export default ContactsList;
