import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';

import Logo from '../../assets/logo.png';
import Avatar from '../../assets/avatar.png';

import { useUser } from '../../hooks/useUser';

export function Header() {
  const { setUser, user } = useUser();

  const [isMenu, setIsMenu] = useState(false);

  const menuItems = [
    { name: 'Home' },
    { name: 'Menu' },
    { name: 'About Us' },
    { name: 'Services' },
  ];

  function handleOpenMenu() {
    setIsMenu(!isMenu)
  }

  function login() {
    if (!user?.displayName) {
      const userFakeTeste = {
        displayName: 'Wesley Wisch',
        email: 'wesley_wisch@hotmail.com',
        photoURL: 'https://github.com/wesleywisch.png',
        providerId: 'Google.com',
        uid: '7427483269bfjsdjlbfkjb238y482',
        admin: true,
      }

      setUser(userFakeTeste);
      console.log('Fazer essa funcionalidade')
    }
  }

  function logout() {
    setIsMenu(false);
    localStorage.removeItem('user');
    setUser({
      displayName: '',
      email: '',
      photoURL: '',
      providerId: '',
      uid: '',
    });

    console.log('Fazer essa funcionalidade por enquanto somente fazendo logout do perfil fake!');
  }

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16">
      {/* Desktop & table  */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            {menuItems.map((item, key) => (
              <li
                key={key}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </motion.ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket
              className="text-textColor text-2xl cursor-pointer"
            />

            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              src={user?.photoURL ? user.photoURL : Avatar}
              alt={user?.displayName ? user.displayName : 'Avatar'}
              onClick={() => {
                if (user && user.displayName) {
                  handleOpenMenu();
                } else {
                  login();
                }
              }}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.admin === true && (
                  <Link
                    to='/createItem'
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    New Item <MdAdd />
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>


      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            src={user?.photoURL ? user.photoURL : Avatar}
            alt={user?.displayName ? user.displayName : 'Avatar'}
            onClick={() => {
              if (user && user.displayName) {
                handleOpenMenu();
              } else {
                login();
              }
            }}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.admin === true && (
                <Link
                  to='/createItem'
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  New Item <MdAdd />
                </Link>
              )}

              <ul className="flex flex-col">
                {menuItems.map((item, key) => (
                  <li
                    key={key}
                    className="text-base text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}