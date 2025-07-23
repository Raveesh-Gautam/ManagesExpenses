import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Home from '../Home';

const AuthPage = () => {
    const [isLogin,setIsLogin]=useState(false);
    const [isHome,setIsHome]=useState(false);
     const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };
  const handleSuccess=()=>{
setIsHome(true);

  }
  return (
    <div>
        {isLogin?  <Login  onToggle={toggleAuthMode} onSuccess={handleSuccess}/>:<SignUp onToggle ={toggleAuthMode} />}
    </div>
  )
}

export default AuthPage