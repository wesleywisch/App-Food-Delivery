import { useState } from "react";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { AiOutlineFileText, AiOutlineArrowUp } from 'react-icons/ai';
import { motion } from "framer-motion";

import { categories } from "../../utils/categories";

import { Loading } from "../Loading";
import { heroData } from "../../utils/HeroData";

export function CreateContainer() {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageAsset, setImageAsset] = useState('');
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  function handleUploadImage(e: any) {
    setIsLoading(true);

    const imageFile = e.target.files[0];

    try {
      // Aqui conectar ao banco de dados e realmente fazer o upload da imagem.
      const uploadImgInDatabase = `Images/${Date.now()}-${imageFile.name}`;

      // aqui realizar toda a questão para fazer o upload da imagem.

      // ai dando tudo certo é so salvar nos estados.
      setImageAsset('http://pat.feldman.com.br/wp-content/uploads/2012/01/comida-caseira.jpg');
      setFields(true);
      setMsg('Image uploaded successfully');
      setAlertStatus('success');
      setIsLoading(false);

      setTimeout(() => {
        setFields(false);
      }, 4000);

    } catch (err) {
      console.log(err);
      setFields(true);
      setMsg('Error while uploading : Try Again');
      setAlertStatus('danger');

      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000)
    };
  }

  function handleDeleteImage() {
    setIsLoading(true);

    try {
      // aqui fazer a parte de deletar a img do banco de dados.
      const deleteUploadImgInDatabase = 'Delete';

      // ai se der tudo certo so salvar nos estados.
      setImageAsset('');
      setFields(true);
      setMsg('Image deleted successfully');
      setAlertStatus('success');
      setIsLoading(false);

      setTimeout(() => {
        setFields(false);
      }, 4000);
    } catch (err) {
      console.log(err);
      setFields(true);
      setMsg('Error deleting image : Try Again');
      setAlertStatus('danger');

      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000)
    }
  }

  function handleSaveDetails() {
    setIsLoading(true);

    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus('danger');

        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          name: title,
          imgSrc: imageAsset,
          category: category,
          calories: calories,
          amount: 1,
          price: price,
          desc: desc,
        };

        // aqui também salvar no banco de dados.
        heroData.push(data);

        // ai se der certo somente salvar nos estados.
        setFields(true);
        setMsg('Data uploaded successfully');
        setAlertStatus('success');
        setIsLoading(false);
        clearData();

        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setFields(true);
      setMsg('Error while uploading : Try Again');
      setAlertStatus('danger');

      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000)
    }
  }

  function clearData() {
    setTitle('');
    setImageAsset('');
    setCalories('');
    setPrice('');
    setCategory('');
    setDesc('');
    setAmount('');
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}
          >
            {msg}
          </motion.p>
        )}

        {/* Colocar o title para o item */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />

          <input
            type="text"
            required
            value={title}
            placeholder="Give me a title..."
            onChange={e => setTitle(e.target.value)}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        {/* Selecionar a categoria do item*/}
        <div className="w-full">
          <select
            onChange={e => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>

            {categories.map((item, key) => (
              <option
                key={key}
                value={item.urlParamName}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Realizar o upload da imagem do item */}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? <Loading /> : (
            <>
              {!imageAsset ?
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                    <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
                  </div>

                  <input
                    type="file"
                    name="uploadImage"
                    accept="image/*"
                    onChange={handleUploadImage}
                    className="w-0 h-0"
                  />
                </label>
                :
                <div className="relative h-full">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={imageAsset}
                    alt="Uploaded image"
                  />

                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              }
            </>
          )}
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />

            <input
              type="text"
              required
              value={calories}
              onChange={e => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />

            <input
              type="text"
              required
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <AiOutlineFileText className="text-gray-700 text-2xl" />

            <input
              type="text"
              required
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Description"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <AiOutlineArrowUp className="text-gray-700 text-2xl" />

            <input
              type="text"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2">
          <button
            type="button"
            onClick={handleSaveDetails}
            className="ml-0 w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          >
            Save
          </button>

          <button
            type="button"
            onClick={clearData}
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-red-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}