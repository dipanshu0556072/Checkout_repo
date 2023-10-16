import React, { useState } from "react";
import styles from "./feedback.module.css";
import smile from "./smile.png";
import neutral from "./neutral.png";
import angry from "./angry.png";
import { useStepContext } from "../../contexts/StepContext";
import { useCartContext } from "../../contexts/CartContext";
import axios from "axios";
export default function Feedback() {
   const [selectcircle, setSelectCircle] = useState(null);
   const { handleExit } = useStepContext();

   async function circleSelect(imageName) {
      setSelectCircle(imageName);
      const post = 
         {
            "user_feedback":imageName,
        } 
      axios.post('http://localhost:8082/addFeedback', post)
      console.log(imageName);
   }

   return (
      <div className={styles.content}>
         <span className={styles.heading}>Rate Your Experience</span>
         <div>
            <img
               src={smile}
               alt="smile"
               onClick={() => circleSelect("smile")}
               className={`${styles.emoji} ${
                  selectcircle === "smile" && styles.selected
               }`}
            />
            <img
               src={neutral}
               alt="neutral"
               onClick={() => circleSelect("neutral")}
               className={`${styles.emoji} ${
                  selectcircle === "neutral" && styles.selected
               }`}
            />
            <img
               src={angry}
               alt="angry"
               onClick={() => circleSelect("angry")}
               className={`${styles.emoji} ${
                  selectcircle === "angry" && styles.selected
               }`}
            />
         </div>
         <button
            className={`${styles.finalButton} ${
               selectcircle && styles.submitType
            }`}
            onClick={handleExit}
         >
            {selectcircle ? "Submit" : "Skip"} Feedback
         </button>
         <div>
            <span className={styles.addInfo}>
               We would love to hear from you.{" "}
            </span>
            <span className={styles.addInfo}>
               Please reach us out at{" "}
               <span className={styles.link}>
                  selfc.retail-feedback@kpmg.com
               </span>{" "}
               for any additional feedback.
            </span>
         </div>
      </div>
   );
}

