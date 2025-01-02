import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import {
  DominosMenu,
  Layout,
  Cart,
  MockPayment,
  Confirmation,
  Address,
  SignIn,
  SignUp,
  UserDetails,
  Profile,
  AddressList,
} from "./Components/Index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/Cart" element={<Cart />} />
      <Route path="/payment" element={<MockPayment />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/address" element={<Address />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/UserDetails" element={<UserDetails />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/AddressList" element={<AddressList />} />
      <Route path="/DominosMenu" element={<DominosMenu />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
