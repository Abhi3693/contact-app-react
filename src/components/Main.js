import ContactsList from './ContactsList';
import MessageList from './MessageList';

function Main() {
  return (
    <>
      <nav className='container'>
        <div className='nav nav-tabs mt-4' id='nav-tab' role='tablist'>
          <button
            className='nav-link active'
            id='nav-home-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-home'
            type='button'
            role='tab'
            aria-controls='nav-home'
            aria-selected='true'
          >
            Contacts
          </button>
          <button
            className='nav-link'
            id='nav-profile-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-profile'
            type='button'
            role='tab'
            aria-controls='nav-profile'
            aria-selected='false'
          >
            Messages
          </button>
        </div>
      </nav>
      <div className='tab-content' id='nav-tabContent'>
        <div
          className='tab-pane fade show active'
          id='nav-home'
          role='tabpanel'
          aria-labelledby='nav-home-tab'
          tabIndex='0'
        >
          <ContactsList />
        </div>
        <div
          className='tab-pane fade'
          id='nav-profile'
          role='tabpanel'
          aria-labelledby='nav-profile-tab'
          tabIndex='0'
        >
          <MessageList />
        </div>
      </div>
    </>
  );
}

export default Main;
