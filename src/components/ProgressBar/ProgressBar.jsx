import styles from "./ProgressBar.module.css";
import { useStepContext } from "../../contexts/StepContext";
import tickImg from "./tick.png";
import hourglassImg from "./hourglass.gif";

export default function ProgressBar() {
   const { step, pages } = useStepContext();
   const pageNames = ["Welcome", "Login", "Cart", "Payment", "Feedback"];

   return (
      <div className={styles.progressBar}>
         {pages.map((currentPage, index) => (
            <>
               <div key={currentPage} className={styles.progressContainer}>
                  <div
                     className={`${styles.progress} ${
                        step >= index ? styles.completed : styles.incomplete
                     }`}
                  >
                     {step > index && (
                        <img className={styles.tickImg} src={tickImg} />
                     )}
                     {step === index && (
                        <>
                           <div className={styles.current}></div>
                           <img
                              className={styles.hourglassImg}
                              src={hourglassImg}
                           />
                        </>
                     )}
                  </div>
                  <small className={styles.label}>{pageNames[index]}</small>
               </div>
               {index !== pages.length - 1 && <hr />}
            </>
         ))}
      </div>
   );
}
