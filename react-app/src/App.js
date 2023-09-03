import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Categories from "./components/Categories";
import { authenticate } from "./store/session";
import Deals from "./components/Deals";
import RestaurantCategories from "./components/RestaurantCategories";
import RestaurantDetails from "./components/RestaurantDetails";
import UserRestaurants from "./components/UserRestaurants";
import AboutLinks from "./components/aboutLinks";
import Order from "./components/Order";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Categories />
            <Deals />
            <RestaurantCategories />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/restaurant/:restaurantId'>
            <RestaurantDetails />
          </Route>
          <Route exact path='/order'>
            <Order />
          </Route>
          <Route exact path="/restaurants/user/:userId">
            <UserRestaurants />
          </Route>
        </Switch>
      )}
      <AboutLinks/>
    </>
  );
}

export default App;
