import { createContext, useContext, useState, useEffect, Children } from "react";
import axios from "axios";
import BagImg from '../assets/carryBag2.svg';

const CartContext = createContext();
const CartContext1 = createContext();

export function useCartContext() {
   return useContext(CartContext);
}
export function useCartContext1() {
   return useContext(CartContext1);
}

export function CartBagCount({ cbCount,openCarryBag}) {
   // Now you can access cbCount as the value of cbCount[0]
 
  //  const [count0, setCount0] = useState(cbCount[0]);
  //  const [count1, setCount1] = useState(cbCount[1]);
  //  const [count2, setCount2] = useState(cbCount[2]);
  //  // Update counts when cbCount prop changes
  //  useEffect(() => {
  //    setCount0(cbCount[0]);
  //    setCount1(cbCount[1]);
  //    setCount2(cbCount[2]);
  //  }, [cbCount]);
  //  const totalBag=(count0+count1+count2);
  //  const totalBagMrp=((count0*5)+(count1*15)+(count2*25));
  //  if((count0+count1+count2)>0){
      
  //  }
  //  if(!openCarryBag&&totalBag>0){
  //   data.push({
  //     id: 14,
  //     brandName: "KPMG",
  //     productName: "KPMG Bags",
  //     mrp: ((count0*5)+(count1*15)+(count2*25)),
  //     price: ((count0*5)+(count1*15)+(count2*25)),
  //     quantity: (count0+count1+count2),
  //     image: BagImg ,
  //   });
  //  }
  // console.log("Total Bag Count "+totalBag+" "+totalBagMrp+" "+openCarryBag);
  //  return (
  //    <>
      
      
  //      <div>
  //        <p>{count0}+" "+{count1}+" "+{count2}+" "+</p>          
  //      </div>
  //    </>
  //  );
 }
 

export default function CartProvider({ children}) {

   const [cartItems, setCartItems] = useState([]);
   const [showPaymentOpts, setShowPaymentOpts] = useState(false);
   const [printInvoice, setPrintInvoice] = useState(false);
   const [recieveInvoiceOpts, setRecieveInvoiceOpts] = useState([]);
   const [paymentMethod, setPaymentMethod] = useState(null);
   const [emptyCart, setEmptyCart] = useState(true); // Default to true

 
       
  function fetchCartItems() {
  
  
   // Fetch the data from the API
     axios.get("http://localhost:8082/products/productList")
       .then((response) => {
            const data = response.data;
            setCartItems(data);
          
            setEmptyCart(data.length === 0);
         })
         .catch((error) => {
            console.log("Error fetching data: ", error.message);
         });
   
      setCartItems(data);
    setEmptyCart(data.length===0);
   
   
       
  }
  

  
   // Handle Item Deletion
   const handleDeleteItem = (itemId) => {
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
      if (updatedCart.length === 0) {
         setEmptyCart(true);
      }
   };

   // Handle the "Recieve Invoice" options
   const handleButtonClick = (option) => {
      if (recieveInvoiceOpts.includes(option)) {
         setRecieveInvoiceOpts(
            recieveInvoiceOpts.filter((item) => item !== option)
         );
      } else {
         setRecieveInvoiceOpts([...recieveInvoiceOpts, option]);
      }
   };

   // Order Summary
   const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
   const discount = cartItems.reduce(
      (acc, item) => acc + (item.mrp - item.price) * item.quantity,
      0
   );
   const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
   );
   const tax = ((total - discount) * 18) / 100;
   const grandTotal = total - discount + tax;
   const roundedDiscount = Number(discount.toFixed(2));
   const roundedTotal = Number(total.toFixed(2));
   const roundedTax = Number(tax.toFixed(2));
   const roundedGrandTotal = Number(grandTotal.toFixed(2)).toLocaleString();

   const orderSummaryVals = {
      itemCount,
      roundedDiscount,
      roundedTotal,
      roundedTax,
      roundedGrandTotal,
   };

   const contextValue = {
      // Cart Items
      emptyCart,
      setEmptyCart,
      cartItems,

      //
      setCartItems,

      // Cart Item Deletion
      handleDeleteItem,
      handleButtonClick,
      fetchCartItems,

      // Cart Details
      orderSummaryVals,

      // Payment Options & Details
      showPaymentOpts,
      setShowPaymentOpts,
      paymentMethod,
      setPaymentMethod,
      printInvoice,
      setPrintInvoice,
      recieveInvoiceOpts,
      setRecieveInvoiceOpts,
   };

   return (
      <CartContext.Provider value={contextValue}>
         {children}
      </CartContext.Provider>
   );
}
