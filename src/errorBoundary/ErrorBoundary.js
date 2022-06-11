import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  state = {
    error: null,
    errorInfo: null,
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-holder text-center'>
          <h1 className='my-2 text-danger text-center'>SomeThing Went Wrong</h1>
          <h1 className='my-2 text-danger text-center'>Please Refresh Page</h1>
          <Link push to='/' className='text-center'>
            <button className='btn btn-primary'>Home</button>
          </Link>
          <p className='text-danger'>{this.state.errorInfo}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
