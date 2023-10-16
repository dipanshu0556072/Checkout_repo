import React, { Component } from "react";
import Select from "react-select";
import { IN, US, GE, RU, FR, UA, AU } from "country-flag-icons/react/3x2";
import "./loginStyles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-simple-keyboard/build/css/index.css";
import axios from "axios";
const options = [
   { value: "+91", label: "India", flag: <IN /> },
   { value: "+1", label: "USA", flag: <US /> },
   { value: "+44", label: "Germany", flag: <GE /> },
   { value: "+7", label: "Russia", flag: <RU /> },
   { value: "+33", label: "France", flag: <FR /> },
   { value: "+380", label: "Ukraine", flag: <UA /> },
   { value: "+61", label: "Australia", flag: <AU /> },
];


export default function Login() {

   const [mobileNumber, setMobileNumber] = useState("");
   const [isInvalid, setIsInvalid] = useState(false);
   const [isMobileExist, setMobileExist] = useState(false);
   const [isInvalidSelect, setIsInvalidSelect] = useState(false);
   const [selectedCountry, setSelectedCountry] = useState(null); // Set the initial selected country
   const [userId,setUserId] = useState();
   const navigate = useNavigate();


   function CountrySelect() {
      function handleCountryChange(selectedOption) {
       setSelectedCountry(selectedOption);
    }
 
    function formatOptionLabel({ label, flag }) {
       return (
          <>
          <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
             <div style={{width:"20px"}}>{flag}</div>
             {label}
  
          </div>
          </>
       );
    }
 
    return (
       <div className="select-div">
          <Select
             options={options}
             value={selectedCountry}
             onChange={handleCountryChange}
             formatOptionLabel={formatOptionLabel}
             className="country-select"
             isSearchable={false}
          />
       </div>
    );
 }
 


   function handleKeyPress(key) {
      const currentMobileNumber = mobileNumber.replace(/-/g, "");

      if (currentMobileNumber.length < 10) {
         const newMobileNumber = currentMobileNumber + key.target.innerText;
         let formattedMobileNumber = "";

         if (newMobileNumber.length <= 3) {
            formattedMobileNumber = newMobileNumber;
         } else if (newMobileNumber.length <= 6) {
            formattedMobileNumber = `${newMobileNumber.slice(
               0,
               3
            )}-${newMobileNumber.slice(3)}`;
         } else {
            formattedMobileNumber = `${newMobileNumber.slice(
               0,
               3
            )}-${newMobileNumber.slice(3, 6)}-${newMobileNumber.slice(6, 10)}`;
         }

         setMobileNumber(formattedMobileNumber);
      }
   }

   function handleClear() {
      setMobileNumber("");
   }

   async function handleContinue () {

      if (mobileNumber.length !== 12)
      {
         setTimeout(() => {
            setIsInvalid(true);
         }, 2500);
         setIsInvalid(false);
      }

      if(selectedCountry===null){
         setTimeout(() => {
            setIsInvalidSelect(true);
         }, 2500);
         setIsInvalidSelect(false);      
      }
     

      if(selectedCountry!==null && mobileNumber.length===12){





         
         console.log("Dipanshu "+selectedCountry.value); 
         const str=selectedCountry.value
         const post = 
         {
            "mobileNumber":str+mobileNumber,
        } 
       
      //   axios.get('http://localhost:8082/new_table/searchMobile')
      // .then(response => {
      //   console.log("check kro"+response.data);
      //   if (response.data === "Mobile number already exists.") {

      //    setMobileExist(true);
      //  } else {
      //    // Mobile number doesn't exist
      //    setMobileExist(false);
      //    // Perform the navigation here

      //  }
      // })
      
      axios.post('http://localhost:8081/addUser', post)
      .then((res) => 
      {
         console.log(res.data.userId);
         setUserId(res.data.userId);

      }).catch((err) => {
         alert("something went wrong!!")
      })
      navigate('/cart',{state: {userId:userId}});
      }
     
}

   function handleKeyboardChange(input) {
      setMobileNumber(input);
   }

   return (
      <>
         <div className="top-div">
            <span className="heading">
               Please enter your{" "}
               <span style={{ fontWeight: "500" }}>Mobile Number</span>
            </span>
         </div>
         
         <div className="bottom-div">
            <div className="login-left-div">
               <div className="input-fields-div">
                  {/* Select */}
                  <CountrySelect />
                  {/* Input */}
                  <div
                     style={{
                        position: "relative",
                     }}
                  >
                     <input
                        type="text"
                        className="login-input"
                        placeholder="123-456-7890"
                        value={mobileNumber}
                        maxLength={10}
                        readOnly
                     />
                    {isInvalid && (
                          <small  className="caution">Please enter a 10-digit mobile number</small>
                     )}
                    {isInvalidSelect && (
                         <small  className="caution">Please select country code</small>
                     )}
                     {isMobileExist && (
                         <small  className="caution">Mobile Already Exist!</small>
                     )}
                  </div>
               </div>
               {/* Button */}
               <button className="button-28" onClick={handleContinue}>
                  Continue to Cart
               </button>
            </div>
            <div className="login-right-div">
               <Keypad
                  handleKeyPress={handleKeyPress}
                  handleClear={handleClear}  
               />
            </div>
         </div>
      </>
   );
                  

}

function Keypad({ handleKeyPress, handleClear }) {
   return (
      <div className="login-keypad">
         <div className="login-keypad-row">
            <button className="login-keypad-button" onClick={handleKeyPress}>
               1
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               2
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               3
            </button>
         </div>
         <div className="login-keypad-row">
            <button className="login-keypad-button" onClick={handleKeyPress}>
               4
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               5
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               6
            </button>
         </div>
         <div className="login-keypad-row">
            <button className="login-keypad-button" onClick={handleKeyPress}>
               7
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               8
            </button>
            <button className="login-keypad-button" onClick={handleKeyPress}>
               9
            </button>
         </div>
         <div className="login-keypad-row-0">
            <button className="login-keypad-button" onClick={handleKeyPress}>
               0
            </button>
            <button className="login-keypad-button long" onClick={handleClear}>
               Clear
            </button>
         </div>
      </div>
   );
}
