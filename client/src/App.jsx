/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { createContext } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/Routes";
import store from "./redux/store";

export const userDataContext = createContext();

const App = () => {
  return (
    <div>
      <Provider store={store}>
      
        <RouterProvider router={router} />
      </Provider>
      <Toaster />
    </div>
  );
};

export default App;
