import { useStepContext } from "../../contexts/StepContext";
import upiQr from "./upi-qr.png";
import timerGif from "./timer-gif.gif";
import "./Payment.css";

export default function Card() {
   const { handleNext } = useStepContext();
   return (
      <>
         <span className="paymentHeading">
            <span className="boldText">Scan </span> the{" "}
            <span className="boldText">QR Code</span> and complete the payment
         </span>
         <div className="paymentContent">
            <img
               onClick={handleNext}
               className="machineImg"
               src={upiQr}
               alt="UPI QR"
            />
            <img className="timerImg" src={timerGif} alt="Timer" />
         </div>
      </>
   );
}
