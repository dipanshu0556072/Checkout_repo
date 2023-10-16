import { useStepContext } from "../../contexts/StepContext";
import machineImg from "./card-machine.jpg";
import timerGif from "./timer-gif.gif";
import "./Payment.css";

export default function Card() {
   const { handleNext } = useStepContext();
   return (
      <>
         <span className="paymentHeading">
            <span className="boldText">Insert, Swipe or Tap</span> your{" "}
            <span className="boldText">Credit / Debit Card</span> on the Card
            Machine
         </span>
         <div className="paymentContent">
            <img
               onClick={handleNext}
               className="machineImg"
               src={machineImg}
               alt="Card Machine"
            />
            <img className="timerImg" src={timerGif} alt="Timer" />
         </div>
      </>
   );
}
