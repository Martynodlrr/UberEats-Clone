import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as shoppingCartActions from '../../store/session.js'
import "./index.css";

function ShoppingCartModal({ state }) {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(shoppingCartActions.clearShoppingCart(user.id));
    closeModal();
  };

  return (
    <>
      <div className="cartModal">
        <h1 className="cartModal">{state === 'clearCartButton' ? 'This will clear your cart, proceed?' : 'Adding items from other restaurants clears your current cart, proceed?'}</h1>
        <form onSubmit={handleSubmit} className="cartModal" id="formInfo">
          <button type="submit" className="clearSubmit" onClick={handleSubmit}>Yes, start a new cart</button>
          <button type="submit" className="dontClearSubmit" onClick={() => closeModal()}>No, keep my current cart</button>
        </form>
      </div>
    </>
  );
}

export default ShoppingCartModal;
