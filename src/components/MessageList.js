import { useState, useEffect } from 'react';

import useFetch from '../customHooks/useFetch';
import { MESSAGES_URL } from '../utils/constants';

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [apiError, setAPIError] = useState('');
  const { makeApiCall, isLoading } = useFetch();
  let timeID = null;

  useEffect(() => {
    fetchMessages();
    return () => {
      if (timeID) {
        clearTimeout(timeID);
      }
    };
  }, []);

  const removeError = () => {
    setAPIError('');
  };

  const fetchMessages = async () => {
    let response = await makeApiCall(MESSAGES_URL);
    if (response.error) {
      setAPIError('');
    } else {
      setMessages(response.messages);
    }
  };

  const convertDate = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleString();
  };

  if (apiError) {
    timeID = setTimeout(removeError, 2000);
  }

  if (isLoading) {
    return <h1 className='text-center text-success my-5'>Loading...</h1>;
  }

  return (
    <div className='col-lg-8 col-md-10 col-sm-12 col-xs-12 border border-4 p-3 pb-5 mt-5 m-0 mx-auto'>
      <h2 className='text-center text-secondary'>Messages list</h2>
      <p className='text-center text-danger my-4'>{apiError ? apiError : ''}</p>
      {messages.length ? (
        <ul className='row'>
          <div className='col-lg-10 col-md-10 col-sm-12 col-xs-12 mx-auto'>
            <div className='row align-items-start bd-light p-2 mb-2'>
              <div className='col fs-5 fw-semibold text-center'>Name</div>
              <div className='col fs-5 fw-semibold text-center'>OTP</div>
              <div className='col fs-5 fw-semibold text-center'>Time</div>
            </div>
            {messages.map((msg, index) => {
              return (
                <div
                  className='row align-items-start bg-light p-2 border-bottom border-3 mb-2'
                  key={msg._id}
                >
                  <div className='col text-center'>{msg.name}</div>
                  <div className='col text-center'>{msg.otp}</div>
                  <div className='col text-center'>
                    {convertDate(msg.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        </ul>
      ) : (
        <span
          key='no'
          className='d-block col-10 mx-auto p-3 my-5 bg-light fs-4 text-center'
        >
          No any message..
        </span>
      )}
    </div>
  );
}

export default MessageList;
