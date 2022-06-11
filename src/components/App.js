import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import ContactInfo from './ContactInfo';
import MessageForm from './MessageForm';
import PageNotFound from './PageNotFound';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/contacts/:id' element={<ContactInfo />} />
          <Route path='/contacts/:id/message' element={<MessageForm />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
