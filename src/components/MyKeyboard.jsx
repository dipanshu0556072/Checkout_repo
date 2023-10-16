import React, { useEffect, useRef } from "react";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default function MyCustomKeyboard(props) {
   const keyboardContainer = useRef(null);
   let keyboard;

   useEffect(() => {
      keyboard = new Keyboard(keyboardContainer.current, {
         onChange: (input) => props.onChange(input),
         onKeyPress: (button) => props.onKeyPress(button),
         theme: "hg-theme-default hg-theme-ios",
         layout: {
            default: [
               "q w e r t y u i o p {bksp}",
               "a s d f g h j k l {enter}",
               "{shift} z x c v b n m , . {shift}",
               "{alt} {space} {altright} {downkeyboard}",
            ],
            shift: [
               "Q W E R T Y U I O P {bksp}",
               "A S D F G H J K L {enter}",
               "{shiftactivated} Z X C V B N M , . {shiftactivated}",
               "{alt} {space} {altright} {downkeyboard}",
            ],
            alt: [
               "1 2 3 4 5 6 7 8 9 0 {bksp}",
               `@ # $ & * ( ) ' " {enter}`,
               "{shift} % - + = / ; : ! ? {shift}",
               "{default} {smileys} {space} {back} {downkeyboard}",
            ],
         },
         display: {
            "{alt}": ".?123",
            "{shift}": "⇧",
            "{shiftactivated}": "⇧",
            "{enter}": "return",
            "{bksp}": "⌫",
            "{altright}": ".?123",
            "{downkeyboard}": "🞃",
            "{space}": " ",
            "{default}": "ABC",
            "{back}": "⇦",
         },
      });

      // Clean up the keyboard when the component unmounts
      return () => {
         keyboard.destroy();
      };
   }, [props]);

   return <div ref={keyboardContainer}></div>;
}
