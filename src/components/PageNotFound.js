import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  let navigate = useNavigate();
  return (
    <>
      <h1 className='text-center my-5 text-danger'>Page not found | 404</h1>
      <button
        className='btn btn-primary text-center d-block mx-auto'
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </>
  );
}

export default PageNotFound;
