import { GiSolarSystem } from "react-icons/gi";
import { WiStars } from "react-icons/wi";
import { IoMoonSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

import { HomeCard } from "@components/UI/indexUI";
import { PageRoutes } from "@src/constants";


export const HomePage: React.FC = () => {
  return (
    <section className="grid mt-6 sm:mt-12 p-8 min-w-full text-center ">
      <section className="text-center mb-14 sm:mb-0">
        <h1 className='text-5xl text-red-400 mb-2 sm:mb-1'>Astronomy Application</h1>
        <p className="mb-10 text-blue-200">Designed by Mehmet Omercik</p>
        <p className="text-2xl mb-4">Welcome to the homepage of my Astronomy Web Application.</p>
        <p className="text-2xl mb-4">
          This application is connected to a free astronomy API so that it can
          collect vital information about celestial bodies in the universe.
        </p>
        <p className="text-2xl">
          Feel free to explore the page using the sidebar on the left or the links below.
        </p>
      </section>
      <section>
        <h1 className="text-2xl mb-5 text-yellow-500">Please click the links below to go to the following pages</h1>
        <div className="flex flex-col sm:flex-row gap-10 items-center sm:justify-center">
          <IconContext.Provider value={{ className: "text-9xl" }}>
            <HomeCard 
                icon={<GiSolarSystem className="text-sky-500"/>} 
                title={'Solar System'}
                navigatePath={PageRoutes.SOLAR_SYSTEM_PAGE} 
              />
              <HomeCard 
                icon={<WiStars className="text-yellow-300" />} 
                title={'Star Chart'} 
                navigatePath={PageRoutes.STAR_CHART_PAGE} 
              />
              <HomeCard 
                icon={<IoMoonSharp />} 
                title={'Moon Phases'} 
                navigatePath={PageRoutes.MOON_PHASE_PAGE} 
              />
          </IconContext.Provider>
        </div>
      </section>
    </section>
  );
};
