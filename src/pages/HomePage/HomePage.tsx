import { FC } from "react";

export const HomePage: FC = () => {
  return (
    <div>
      <section className="mt-16 text-center text-xl leading-9 sm:container">
        <p>Home Page</p>
        <p>Hello, welcome to the homepage of my astronomy web application.</p>
        <p>
          This application is connected to the astronomy API so that it can collect vital
          information about celestial bodies in the universe.
        </p>
        <p>Please feel free to explore the page </p>
        <p>I hope you learn alot more about the Universe around you from reading this website </p>
      </section>
    </div>
  );
};
