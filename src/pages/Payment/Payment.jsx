import UPI from "./UPI";
import Card from "./Card";
import { useCartContext } from "../../contexts/CartContext";

export default function Payment() {
   const { paymentMethod } = useCartContext();
   return paymentMethod === "UPI" ? <UPI /> : <Card />;
}
