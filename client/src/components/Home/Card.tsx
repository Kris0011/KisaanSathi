// import explore from '../../assets/explore.jpeg'
import { Tilt } from "react-tilt";
import "./home.css"

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 5, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 100, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.05,.98,.52,.99)", // Easing on enter/exit.
};

export default function Cards(props: { title: any; disc: any; imgSrc: any; even : boolean}) {
  const { title, disc, imgSrc , even } = props;

  return (
    <div className=" ">
      <Tilt options={defaultOptions}>
          <div className={`flex ${ even ? "flex-row-reverse" : ""} border justify-evenly min-h-[300px] items-center p-2 glassy-effect-hero border-gray-800 rounded-lg w-[1000px] backgroud`}>
            <img
              className="md:w-52 md:h-52 w-1/3 md:mb-3 md:mt-2  shadow-lg "
              src={imgSrc}
              alt="No Image"
            />
            <div className="max-w-[600px]">
            <h5 className="md:mb-2 md:text-3xl text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h5>
            <span className="text-sm md:text-lg  px-3  text-justify text-gray-400">
              {disc}
            </span>
            </div>
            
        </div>
      </Tilt>
    </div>
  );
}
