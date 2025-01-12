export const HomePage: React.FC = () => {
  return (
    <section className="mt-16 min-w-full p-8 text-center text-xl leading-[3rem] sm:container flex flex-col gap-y-6">
      <p className='text-4xl text-red-400'>Astronomy Website</p>
      <p>Hello, welcome to the homepage of my astronomy web application.</p>
      <p>
        This application is connected to a free astronomy API so that it can
        collect vital information about celestial bodies in the universe.
      </p>
    </section>
  );
};
