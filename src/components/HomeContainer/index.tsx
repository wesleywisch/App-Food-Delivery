import Delivery from '../../assets/delivery.png';
import HeroBg from '../../assets/heroBg.png';

import { heroData } from '../../utils/HeroData';

export function HomeContainer() {

  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div
        className="py-2 flex-1 flex flex-col items-start justify-center gap-6"
      >
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>

          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              className="W-full h-full object-contain"
              src={Delivery}
              alt="Delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">Your City</span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat voluptates id ratione cupiditate laudantium, error exercitationem ipsam sint soluta nihil eos nobis, earum, dolor iusto quae quas reiciendis nam temporibus!
        </p>

        <button type="button" className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">
          Order Now
        </button>
      </div>

      <div className="py-2 flex-1 flex items-center relative">
        <img
          className="ml-auto h-420 w-full lg:w-auto lg:h-650"
          src={HeroBg}
          alt="Hero-Bg"
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap">
          {heroData.map((item, key) => (
            <div
              key={key}
              className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
            >
              <img
                className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                src={item.imgSrc}
                alt={item.name}
              />

              <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                {item.name}
              </p>

              <p className="text-[0.75rem] lg:text-sm text-lightTextGray font-semibold my-1 lg:my-3">
                {item.desc}
              </p>

              <p className="text-sm font-semibold text-headingColor">
                <span className="text-xs text-red-600">$</span> {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}