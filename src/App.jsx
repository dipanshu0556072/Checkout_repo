import "./App.css";
import Header from "./components/Header/Header";
import AuthProvider from "./contexts/AuthContext";
import StepProvider from "./contexts/StepContext";
import CartProvider from "./contexts/CartContext";
import routeConfig from "./routeConfig";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
   return (
      <Router>
         <AuthProvider>
            <StepProvider>
               <CartProvider>
                  <div className="app">
                     <Header />
                     <div className="page">
                        <Routes>
                           {routeConfig.map((route) => (
                              <Route
                                 key={route.path}
                                 path={route.path}
                                 element={route.element}
                              />
                           ))}
                        </Routes>
                     </div>
                  </div>
               </CartProvider>
            </StepProvider>
         </AuthProvider>
      </Router>
   );
}
