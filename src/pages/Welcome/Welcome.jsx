import styles from "./Welcome.module.css";
import SelfCheckoutImg from "./self-checkout.avif";
import { useStepContext } from "../../contexts/StepContext";

export default function WelcomePageContent() {
   const { handleNext } = useStepContext();
   return (
      <>
         <div className={styles.content}>
            <img className={styles.logo} src={SelfCheckoutImg} />
            <div className={styles.textSpans}>
               <div>
                  <span className={styles.heading}>Self-Checkout</span>
                  <span className={styles.subheading}>
                     For a hassle-free checkout experience
                  </span>
               </div>
               <button onClick={handleNext} >GET STARTED</button>
            </div>
         </div>
      </>
   );
}
