import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Header } from './components/Header';
import { MainContainer } from './components/MainContainer';
import { CreateContainer } from './components/CreateContainer';

import { CartContextProvider } from './contexts/CartContext';
import { FormLogin } from './components/FormLogin';

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <AnimatePresence>
      <FormLogin showModal={showModal} setShowModal={setShowModal} />

      <div className="w-screen h-auto flex flex-col bg-primary">
        <CartContextProvider>
          <Header />

          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route path="/*" element={<MainContainer />} />
              <Route path="/createItem" element={<CreateContainer />} />
            </Routes>
          </main>
        </CartContextProvider>
      </div>
    </AnimatePresence>
  );
}

export default App; 
