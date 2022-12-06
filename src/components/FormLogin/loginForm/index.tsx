import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { AccountContext } from '../index';

import './styles.css';

export function LoginForm() {
  const { switchToSignUOrSignIn } = useContext(AccountContext);

  return (
    <div className="boxContainerLoginForm">
      <form action="" className="formContainer">
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" />
      </form>

      <Link to='#' className='mutedLink'>Forget your password?</Link>

      <button className="submitButton" type='submit'>Sign In</button>

      <span className='mutedLink cursor-pointer' onClick={() => switchToSignUOrSignIn('signUp')}>Don't have an account? <span className='boldLink'>SignUp</span></span>
    </div>
  )
}