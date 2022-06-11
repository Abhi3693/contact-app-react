import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import useFetch from '../customHooks/useFetch';
import { CONTACTS_URL } from '../utils/constants';

function ContactInfo() {
  const [contactInfo, setContactInfo] = useState(null);
  const [error, setError] = useState('');
  const { makeApiCall, isLoading } = useFetch();
  const navigate = useNavigate();
  let timeID = null;

  useEffect(() => {
    fetchUser();
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

  let { id } = useParams();

  const fetchUser = async () => {
    let response = await makeApiCall(CONTACTS_URL + id);
    if (response.error) {
      setError(response.error);
    } else {
      setContactInfo(response.contact);
    }
  };

  if (error) {
    timeID = setTimeout(removeError, 2000);
  }

  if (isLoading) {
    return <h1 className='text-center text-success my-5'>Loading...</h1>;
  }

  return (
    <div className='container'>
      <div className='row gx-5'>
        <div className='col-lg-6 col-md-8 col-sm-10 col-xs-12 mt-5 mx-auto bg-light p-5 text-center border rounded-3'>
          <h3 className='text-secondary mb-5'>Contact Information</h3>
          {!contactInfo ? (
            <p className='text-center text-danger'>{error ? error : ''}</p>
          ) : (
            <>
              <h4 className='my-3'>
                Full Name: {contactInfo.firstName + ' ' + contactInfo.lastName}
              </h4>
              <h4 className='my-3'>Phone : {contactInfo.phone}</h4>
              <Link
                to={'/contacts/' + contactInfo._id + '/message'}
                className='btn btn-primary font-monospace contact my-3'
              >
                Send Message
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
