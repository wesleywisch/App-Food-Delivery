import { MdShoppingBasket } from 'react-icons/md';

import Logo from '../../assets/logo.png';
import Avatar from '../../assets/avatar.png';

export function Header() {
  const menuItems = [
    { name: 'Home' },
    { name: 'Menu' },
    { name: 'About Us' },
    { name: 'Services' },
  ];

  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* Desktop & table  */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="Logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </div>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {menuItems.map((item, key) => (
              <li
                key={key}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket
              className="text-textColor text-2xl cursor-pointer"
            />

            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <img
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl"
            src={Avatar}
            alt="Imagem do usuário"
          />
        </div>
      </div>


      {/* Mobile */}
      <div className="flex md:hidden w-full h-full">

      </div>
    </header>
  )
}