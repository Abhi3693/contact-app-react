import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CONTACTS_URL } from '../utils/constants';

import useFetch from '../customHooks/useFetch';

function MessageForm() {
  const [contactInfo, setContactInfo] = useState(null);
  let { id } = useParams();
  let [newOTP, setOTP] = useState('');
  let [error, setError] = useState('');
  const navigate = useNavigate();
  let timeID = null;

  const { makeApiCall } = useFetch();

  useEffect(() => {
    fetchUser();
    getOTP();
    return () => {
      if (timeID) {
        clearTimeout(timeID);
      }
    };
  }, []);

  const removeError = () => {
    setError('');
    navigate('/');
  };

  const fetchUser = async () => {
    let response = await makeApiCall(CONTACTS_URL + id);
    if (response.error) {
      setError(response.error);
    } else {
      setContactInfo(response.contact);
    }
  };

  function getOTP() {
    let numbers = Array.from(Array(10).keys());
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += numbers[Math.floor(Math.random() * 10)];
    }
    setOTP(otp);
  }

  const fetchSendOTP = async (value) => {
    let response = await makeApiCall(
      CONTACTS_URL + id + '/message',
      'POST',
      JSON.stringify({ message: { otp: value } })
    );
    if (response.error) {
      setError(response.error);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSendOTP(event.target[0].value);
  };

  if (error) {
    timeID = setTimeout(removeError, 2000);
  }

  return (
    <div className='container'>
      <div className='row'>
        <form
          className='col-lg-5 col-md-10 col-sm-10 col-sx-11 mx-auto mt-5 text-center p-5 border rounded-3 bg-light'
          onSubmit={handleSubmit}
        >
          <h3 className='mb-3 text-secondary mb-5'>
            Send message to: {contactInfo ? contactInfo.firstName : 'contact'}
          </h3>
          {error ? (
            <p className='text-center text-danger my-5'>{error ? error : ''}</p>
          ) : (
            <div className='mb-3'>
              <textarea
                readOnly
                name='otp'
                className='form-control'
                id='exampleFormControlTextarea1'
                rows='3'
                value={`Hi your OTP is: ${newOTP}`}
              ></textarea>
              <button
                type='submit'
                className='btn btn-success font-monospace contact mt-5'
              >
                Send Message
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default MessageForm;
