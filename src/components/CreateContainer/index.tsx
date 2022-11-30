import { useState } from "react";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { motion } from "framer-motion";

import { categories } from "./categories";

import { Loading } from "../Loading";

export function CreateContainer() {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleUploadImage() {

  }

  function handleDeleteImage() {

  }

  function handleSaveDetails() {

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
                    className="w-full h-full object-cover"
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

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
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
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            onClick={handleSaveDetails}
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}