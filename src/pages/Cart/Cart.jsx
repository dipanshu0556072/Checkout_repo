/* eslint-disable react/prop-types */
import "./cartStyles.css";
import CartImg from "./cartImg.gif";
import BagImg from "../../assets/carryBag2.svg";
import { BiReceipt } from "react-icons/bi";
import { BsFillBagPlusFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useStepContext } from "../../contexts/StepContext";
import { useCartContext } from "../../contexts/CartContext";
import { useEffect, useState } from "react";
import { CartBagCount } from "../../contexts/CartContext";



export default function Cart({props,user}) {
   const { emptyCart, fetchCartItems, cartItems,setCartItems,showPaymentOpts,isSelected } =
      useCartContext();
   const [openCarryBag, setOpenCarryBag] = useState(false);
   const [cbCount, setCbCount] = useState([0, 0, 0]);

   
   
   return (
      <>
          <div className="cart-container">
            <div className={"cart-left" + (emptyCart ? " empty" : "")}>
               <div className="item-list">
                  {!emptyCart &&
                     cartItems.map((item) => (
                        <ProductTile key={item.id} item={item} cbCount={cbCount}/>
                     ))}
                  {emptyCart && (
                     <div className="empty-cart">
                        <span style={{ fontSize: "27px", marginTop: "30px" }}>
                           Welcome to{" "}
                           <span style={{ fontWeight: "600" }}>
                              KPMG Retail, CyberHub
                           </span>
                        </span>
                        <img
                           style={{ height: "70%" }}
                           src={CartImg}
                           alt="add-to-basket"
                           onClick={fetchCartItems}
                        />
                        <span>
                           Your cart is <b>empty</b>. Please <b>scan</b> your
                           items to add them here.
                        </span>
                     </div>
                  )}
               </div>
            </div>
            <div className="cart-right">
               {showPaymentOpts && !emptyCart ? (
                  <PaymentOpts />
               ) : (
                  <OrderSummary setOpenCarryBag={setOpenCarryBag} />
               )}
            </div>
         </div>
         {openCarryBag && (
            <AddCarryBag
               cbCount={cbCount}
               setCbCount={setCbCount}
               setOpenCarryBag={setOpenCarryBag}
               cartItems={cartItems}
               setCartItems={setCartItems}
               isSelected={isSelected}
            />
         )}
   
      </>
   );
         
//handling ProductTiles Details 
function ProductTile({ item ,cbCount}) {
   const { handleDeleteItem, showPaymentOpts } = useCartContext();
   console.log("In ProductTile");
   const index = cartItems.findIndex(item => item.brandName === "KPMG");

if (index !== -1) {
  console.log("Item with KPMG found at index" +cartItems[index].price);
//   cartItems[index].quantity=cbCount[0]+cbCount[1]+cbCount[2];
//   cartItems[index].price=cbCount[0]*5+cbCount[1]*15+cbCount[2]*25;
//   cartItems[index].mrp=cbCount[0]*5+cbCount[1]*15+cbCount[2]*25;
} else {
   console.log("lastIndex "+index);
}


   return (
      <>
         <div className="product-tile list">
            <div className="detail-1">
               <img src={item.image} alt="product-image" />
            </div>
            <div className="detail-3">
               <div className="brand-name">{item.brandName}</div>
               <div className="product-name">{item.productName}</div>
            </div>
            <div className="detail-2">
               <div className="product-quantity">{item.quantity}</div>
               <span style={{ fontSize: "12px" }}>qty</span>
            </div>
            <div className="detail-4">
               <div className="product-price">₹ {item.price}</div>
               {item.mrp - item.price > 0 && (
                  <div style={{ display: "flex" }}>
                     <div className="mrp">₹ {item.mrp}</div>
                     <div className="discount">
                        {Math.trunc(((item.mrp - item.price) * 100) / item.mrp)}
                        % OFF
                     </div>
                  </div>
               )}
            </div>
            <div className="detail-5">
               <div>
                  ₹{" "}
                  <span className="subtotal-rupee">
                    {
                     item.price*item.quantity
                    }  

                     <span className="subtotal-paise"></span>
                  </span>
               </div>
           
            </div>
            <div className="detail-6">
               {!showPaymentOpts && (
                  <button
                     className="delete-button"
                     onClick={() => handleDeleteItem(item.id)}
                  >
                     ╳
                  </button>
               )}
            </div>
         </div>
      </>
   );
   index=-1;
}

function OrderSummary({ setOpenCarryBag }) {
   const {
      emptyCart,
      orderSummaryVals,
      printInvoice,
      setPrintInvoice,
      setShowPaymentOpts,
      recieveInvoiceOpts,
      handleButtonClick,
   } = useCartContext();

   console.log("In OrderSummary");
   // if(setShowPaymentOpts && cbCount[0]+cbCount[1]+cbCount[2]>0){
   //    console.log("greater then zero");
   // }else if(!setShowPaymentOpts){
   //    console.log("Not True");
   // }
   return (
      <>
         <div className="cart-summary">
            <div className="summary-item">
               <div className="summary-label">Item Count</div>
               <div className="summary-value">{orderSummaryVals.itemCount}</div>
            </div>
            <div className="summary-item">
               <div className="summary-label">Total Amount</div>
               <div className="summary-value">
                  ₹ {orderSummaryVals.roundedTotal}
               </div>
            </div>
            <div className="summary-item">
               <div className="summary-label">Savings</div>
               <div className="summary-value">
                  ₹ {orderSummaryVals.roundedDiscount}
               </div>
            </div>
            <div className="summary-item">
               <div className="summary-label">
                  Tax{" "}
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>
                     (18%)
                  </span>
               </div>
               <div className="summary-value">
                  ₹ {orderSummaryVals.roundedTax}
               </div>
            </div>
            <hr />
            <div className="summary-item">
               <div className="summary-label">Grand Total</div>
               <div className="summary-value grand-total">
                  ₹ {orderSummaryVals.roundedGrandTotal}
               </div>
            </div>
         </div>
         <div className="misc-div">
            <span style={{ fontWeight: "500" }}>
               Please click here to add a carry bag
            </span>
            <button
               // disabled={emptyCart}
               className="notif-button"
               onClick={() => setOpenCarryBag(true)}
            >
               <BsFillBagPlusFill size={20} />
            </button>
         </div>
         <div className="misc-div">
            <span style={{ fontWeight: "500" }}>Need a printed invoice?</span>
            <button
               onClick={() => setPrintInvoice(true)}
               disabled={emptyCart}
               className={`notif-button ${printInvoice && "selected"}`}
            >
               <BiReceipt size={20} />
            </button>
         </div>
         <div className="misc-div">
            <span style={{ fontWeight: "500" }}>Recieve invoice on:</span>
            <div className="notif-buttons-1">
               <button
                  disabled={emptyCart}
                  className={`notif-button ${
                     recieveInvoiceOpts.includes("WhatsApp") && "selected"
                  }`}
                  onClick={() => handleButtonClick("WhatsApp")}
               >
                  WhatsApp
               </button>
               <button
                  disabled={emptyCart}
                  className={`notif-button ${
                     recieveInvoiceOpts.includes("SMS") && "selected"
                  }`}
                  onClick={() => handleButtonClick("SMS")}
               >
                  SMS
               </button>
            </div>
         </div>
         <button
            disabled={emptyCart}
            style={{
               display: "flex",
               justifyItems: "space-evenly",
               alignItems: "center",
               outline: "none",
            }}
            onClick={() => setShowPaymentOpts(true)}
         >
            
            <span>Select a Payment Method</span>
         </button>
      </>
   );
}
}

function PaymentOpts() {
   const { handlePrev, handleNext } = useStepContext();
   const { orderSummaryVals, setShowPaymentOpts } = useCartContext();
   const [selectedOption, setSelectedOption] = useState(null);
   const paymentOpts = [
      {
         name: "Debit/Credit Card",
         offer: "Additional 10% off on HDGC Bank Cards",
      },
      {
         name: "UPI",
         offer: "Get flat 5% discount on UPI payments",
      },
      {
         name: "Net Banking",
         offer: "Get a discount of 5% on Net Banking (Min. Transaction: ₹ 1000)",
      },
      {
         name: "Gift Card",
         offer: "Pay from a Gift Card and earn 200 Reward Points",
      },
   ];
   console.log("In PayOptions");
   // Update the payment method in the context
   const { paymentMethod, setPaymentMethod } = useCartContext();
   useEffect(() => {
      setPaymentMethod(selectedOption);
   }, [selectedOption]);

   const handleOptionClick = (name) => {
      setSelectedOption(name);
      console.log("Selected Payment Option: ", name);
   };

   return (
      <div className="payment-opts">
         <span style={{ fontSize: "25px" }}>
            To Pay: ₹{" "}
            <span style={{ fontWeight: "600" }}>
               {orderSummaryVals.roundedGrandTotal}
            </span>
         </span>
         <div
            style={{
               width: "100%",
               height: "60%",
               display: "flex",
               flexDirection: "column",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            {paymentOpts.map((opt) => (
               <PayOptTile 
                  key={opt.name}
                  name={opt.name}
                  offer={opt.offer}
                  isSelected={selectedOption === opt.name}
                  onClick={() => handleOptionClick(opt.name)}
               />
            ))}
         </div>
         <div>
            <button
               style={{ margin: "10px" }}
               onClick={() => setShowPaymentOpts(false)}
            >
               Back to Cart
            </button>
            <button
               style={{ margin: "10px" }}
               onClick={handleNext}
               disabled={!selectedOption}
            >
               Proceed to Pay
            </button>
         </div>
      </div>
   );
}

function PayOptTile({ name, offer, isSelected, onClick }) {

   console.log("In PayOptTile");
   return (
      <label className={`pay-opt-button ${isSelected ? "highlighted" : ""}`}>
         <input
            type="radio"
            name="paymentOption"
            value={name}
            checked={isSelected}
            onChange={onClick}
            style={{ display: "none" }}
         />
         <span style={{ fontSize: "17px", fontWeight: "600" }}>{name}</span>
         {!isSelected && (
            <span
               style={{ color: "grey", fontSize: "13px", textAlign: "center" }}
            >
               {offer}
            </span>
         )}
      </label>
   );
}


function AddCarryBag({ cbCount, setCbCount, setOpenCarryBag ,cartItems,setCartItems,isSelected}) {
  

   const carryBagData = [
      {
         name: "Small",
         price: 5,
         width: "120px",
         count: cbCount[0],
      },
      {
         name: "Medium",
         price: 15,
         width: "200px",
         count: cbCount[1],
      },
      {
         name: "Large",
         price: 25,
         width: "250px",
         count: cbCount[2],
      },
   ];
 
   function incrementCount(index) {
      let temp = [...cbCount];
      temp[index] += 1;
      setCbCount(temp);
   }

   function decrementCount(index) {
      if (cbCount[index] === 0) return;
      let temp = [...cbCount];
      temp[index] -= 1;
      setCbCount(temp);
   }
   const [AddBagTileList,setAddBagTileList]=useState(false);
   const [buttonClicked, setButtonClicked] = useState(false);
  

   function AddAllCarryBag()
   {
      const newObject=[...cartItems];
      if(cbCount[0]>0)
                           {
                              const newObject1 = { id: (cartItems.length)+1,
                                 brandName: "KPMG",
                                 productName: "KPMG Small Bag",
                                 mrp: 5,
                                 price: 5,
                                 quantity: cbCount[0],
                                 image:  BagImg,};
                                  newObject.push(newObject1);
                           }
      
      if(cbCount[1]>0)
                           {
                              const newObject2 = { id: (cartItems.length)+1,
                                 brandName: "KPMG",
                                 productName: "KPMG Medium Bag",
                                 mrp: 15,
                                 price: 15,
                                 quantity: cbCount[1],
                                 image:  BagImg,};
                                  newObject.push(newObject2);
                           }
      if(cbCount[2]>0)
                           {
                              const newObject3 = { id: (cartItems.length)+1,
                                 brandName: "KPMG",
                                 productName: "KPMG Large Bag",
                                 mrp: 25,
                                 price: 25,
                                 quantity: cbCount[2],
                                 image:  BagImg,};
                                 newObject.push(newObject3);
                              }
                              setCartItems(newObject);

                              // Set the buttonClicked state to true to change the button appearance
                              setButtonClicked(true);
                              setOpenCarryBag(false)
   }
  
   return (
      <>
      <div className="popupContainer" onClick={() => setOpenCarryBag(false)}>
         <div
            className="carry-bag-popup"
            onClick={(event) => event.stopPropagation()}
         >
            <div
               style={{
                  display: "flex",
                  width: "90%",
                  marginTop: "20px",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <span
                  style={{
                     fontSize: "30px",
                     fontWeight: "300px",
                     textAlign:'center',
                  }}
                  className="carry-bag-title"
               >
                  Need a Carry Bag?
               </span>
               <RxCross1 size={30} onClick={() => setOpenCarryBag(false)} />
            </div>

    <div style={{width:'100%',marginBottom:'5%'}}>
            <div className="carry-bag-allItems" >
               {carryBagData.map((bag, index) => (
                  <div className="carry-bag-item">
                     <img
                        src={BagImg}
                        style={{ height: bag.width, marginBottom: "20px" }}
                        onClick={() => incrementCount(index)}
                     />
                     <div
                        style={{
                           display: "flex",
                           justifyContent:'space-between',
                           alignItems: "center",
                        }}
                     >
                        <button
                           className="quantButton"
                           onClick={() => decrementCount(index)}
                           style={{marginRight:'16%'}}
                        >
                           -
                        </button>
                        <button
                           className="quantButton"
                           onClick={() => incrementCount(index)}
                        >
                           +
                        </button>
                        
                     </div>
                     <span style={{ fontSize: "25px" }}>
                        {bag.name} <b>X {bag.count}</b>
                     </span>
                     <span>
                        <b>₹{bag.price}</b>.
                        <span style={{ fontSize: "12px" }}>00</span> per bag
                     </span>
                    
                  </div>
                  
               ))}
              </div>

              <div style={{justifyContent:'center',alignContent:'center',display:'flex'}}>
                 <button
                 disabled={cbCount.length===0}
                 style={{
                  backgroundColor: buttonClicked ? '#003082' : '#D9D8D8', // Change background color on click
                  color: buttonClicked ? 'white' : 'initial', // Change text color on click
                }}
                 onClick={() => {
                        {
                           AddAllCarryBag()
          }
        }}
        >
         Add <b>{cbCount[0]+cbCount[1]+cbCount[2]}</b>  Bags in list</button>              
              </div>
            </div>  
         </div>
      </div>
      </>
   );
}
