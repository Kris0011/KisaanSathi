// import explore from '../../assets/explore.jpeg'
import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 10, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 100, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.05,.98,.52,.99)", // Easing on enter/exit.
};

export default function Cards(props: { title: any; disc: any; imgSrc: any; }) {
  const { title, disc, imgSrc } = props;

  return (
    <div className=" ">
      <Tilt options={defaultOptions}>
          <div className="flex flex-col  border justify-evenly min-h-[400px] items-center p-2 glassy-effect rounded-lg border-gray-800 ">
            <img
              className="md:w-24 md:h-24 w-1/3 md:mb-3 md:mt-2 rounded-full shadow-lg bg-white"
              src={imgSrc}
              alt="No Image"
            />
            <h5 className="md:mb-1 md:text-2xl text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h5>
            <span className="text-sm md:text-lg text-gray-500 px-3 text-justify dark:text-gray-200 ">
              {disc}
            </span>
        </div>
      </Tilt>
    </div>
  );
}
