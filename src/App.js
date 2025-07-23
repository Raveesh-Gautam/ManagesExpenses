import React, { useState } from 'react';
import AuthPage from './components/auth/AuthPage';
import Home from './components/Home';

const App = () => {
  const [isLoginSuccess,setIsLoginSuccess]=useState(false);
  const handleSuccess=()=>{
    setIsLoginSuccess(true);
  }
  return (
    <React.Fragment>
{!isLoginSuccess?<AuthPage onLogin={handleSuccess} />:<Home />}
    
    </React.Fragment>
  )
}

export default App