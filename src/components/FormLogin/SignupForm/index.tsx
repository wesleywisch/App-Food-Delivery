import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AccountContext } from '../index';

import './styles.css';

export function SignUpForm() {
  const { switchToSignUOrSignIn } = useContext(AccountContext);

  return (
    <div className="boxContainerLoginForm">
      <form action="" className="formContainer">
        <input type="text" placeholder="Full name" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <input type="password" placeholder="Confirm password" className="input" />
      </form>

      <Link to='#' className='mutedLink'>Forget your password?</Link>

      <button className="submitButton" type='submit'>Sign In</button>

      <span className='mutedLink cursor-pointer' onClick={() => switchToSignUOrSignIn('signIn')}>Already have an account? <span className='boldLink'>SignUp</span></span>
    </div>
  )
}