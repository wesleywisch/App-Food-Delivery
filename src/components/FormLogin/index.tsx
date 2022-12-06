import { createContext, Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

import { LoginForm } from "./loginForm";
import { SignUpForm } from "./SignupForm";

import './styles.css';
import { MdClose } from "react-icons/md";

interface FormLoginProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface AccountContextProps {
  switchToSignUOrSignIn: (action: string) => void;
}

export const AccountContext = createContext({} as AccountContextProps);

export function FormLogin({ showModal = false, setShowModal }: FormLoginProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [active, setActive] = useState('signIn');

  const expandingTransition = {
    type: 'spring',
    duration: 2.3,
    stiffness: 30,
  }

  const backDropVariants = {
    expanded: {
      width: '233%',
      height: '1050px',
      borderRadius: '20%',
      transform: 'rotate(60deg)',
    },
    collapsed: {
      width: '160%',
      height: '550px',
      borderRadius: '50%',
      transform: 'rotate(60deg)',
    },
  }

  function handlePlayExpandingAnimation() {
    setIsExpanded(true);
    setTimeout(() => {
      setIsExpanded(false)
    }, expandingTransition.duration * 1000 - 1500);
  }

  function switchToSignUOrSignIn(action: string) {
    handlePlayExpandingAnimation();

    if (action === 'signUp') {
      setTimeout(() => {
        setActive('signUp');
      }, 400);

      return;
    }

    if (action === 'signIn') {
      setTimeout(() => {
        setActive('signIn');
      }, 400);

      return;
    }
  }

  if (showModal) {
    return (
      <div className="overlay">
        <AccountContext.Provider value={{ switchToSignUOrSignIn }}>
          <div className="boxContainer">
            <MdClose className="absolute top-1 right-1 z-[4] text-2xl text-white cursor-pointer" onClick={() => setShowModal(false)} />

            <div className="topContainer">
              <motion.div
                className="backDrop"
                variants={backDropVariants}
                initial={false}
                animate={isExpanded ? 'expanded' : 'collapsed'}
                transition={expandingTransition}
              />

              {active === 'signIn' && (
                <div className="headerContainer">
                  <span className="headerText">Welcome</span>
                  <span className="headerText">Back</span>
                  <p className="smallText">Please sign-in to continue!</p>
                </div>
              )}

              {active === 'signUp' && (
                <div className="headerContainer">
                  <span className="headerText">Create</span>
                  <span className="headerText">Account</span>
                  <p className="smallText">Please sign-up to continue!</p>
                </div>
              )}
            </div>

            <div className="innerContainer">
              {active === 'signIn' && <LoginForm />}
              {active === 'signUp' && <SignUpForm />}
            </div>
          </div>
        </AccountContext.Provider>
      </div>
    )
  }

  return null;
}