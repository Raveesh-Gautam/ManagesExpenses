import { useState } from 'react';
import Home from './components/Home';

const App = () => {
  const [isLoginSuccess,setIsLoginSuccess]=useState(false);
  const handleSuccess=()=>{
    setIsLoginSuccess(true);
  }
  return (
//     <React.Fragment>
// {!isLoginSuccess?<AuthPage onLogin={handleSuccess} />:<Home />}
//     </React.Fragment>
    <Home />
  )
}

export default App