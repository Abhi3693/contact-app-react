import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import yup, { setLocale } from 'yup';

import validate from '../utils/validate';
import useFetch from '../customHooks/useFetch';
import { CONTACTS_URL } from '../utils/constants';

const initialInputInfo = {
  firstName: '',
  lastName: '',
  phone: '',
  err: '',
};

const initialInputError = {
  firstName: '',
  lastName: '',
  phone: '',
};

const initialAPIError = {
  fetchContacts: '',
  addContact: '',
};

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [inputInfo, setInputInfo] = useState(initialInputInfo);
  const [inputError, setInputError] = useState(initialInputError);
  const [apiError, setAPIError] = useState(initialAPIError);
  let timeID = null;

  const { makeApiCall, isLoading } = useFetch();

  useEffect(() => {
    fetchContacts();
    return () => {
      if (timeID) {
        clearTimeout(timeID);
      }
    };
  }, []);

  const removeError = () => {
    setAPIError(initialAPIError);
    setInputError(initialInputError);
  };

  const fetchContacts = async () => {
    let response = await makeApiCall(CONTACTS_URL);
    setInputError(initialInputError);
    if (response.error) {
      setAPIError({ ...apiError, fetchContacts: response.error });
      setInputError(initialInputError);
    } else {
      setContacts(response.contacts);
      setAPIError(initialAPIError);
    }
  };

  const handleAddContact = async (url, method, body) => {
    let response = await makeApiCall(url, method, body);
    if (response.error) {
      console.log(initialInputError);
      setInputError({ firstName: '', lastName: '', phone: '' });
      setAPIError({ ...apiError, addContact: response.error });
    } else {
      fetchContacts();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { firstName, lastName, phone } = inputInfo;

    if (firstName && lastName && phone) {
      handleAddContact(
        CONTACTS_URL,
        'POST',
        JSON.stringify({ contact: { firstName, lastName, phone } })
      );
      setInputInfo(initialInputInfo);
      setInputError(initialInputError);
    } else {
      setInputError({
        ...inputError,
        firstName: 'First name is requird',
        lastName: 'Last name is requird',
        phone: 'Phone is required',
      });
      setInputInfo(initialInputInfo);
      return;
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    validate(inputError, name, value);
    setInputError({ ...inputError });
    setInputInfo({ ...inputInfo, [name]: value });
  };

  if (
    apiError.addContact ||
    apiError.fetchContacts ||
    (inputError.firstName && inputError.lastName && inputError.phone)
  ) {
    timeID = setTimeout(removeError, 2000);
  }

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
            onSubmit={handleSubmit}
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
                value={inputInfo.firstName}
              />
              <p className='my-2 text-danger'>{inputError.firstName}</p>
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
                value={inputInfo.lastName}
              />
              <p className='my-2 text-danger'>{inputError.lastName}</p>
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
                value={inputInfo.phone}
              />
              <p className='my-2 text-danger'>{inputError.phone}</p>
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

export default ContactsList;
