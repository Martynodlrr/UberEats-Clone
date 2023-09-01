import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { TiDelete } from 'react-icons/ti';
import { useModal } from "../../context/Modal";
import * as shoppingCartActions from '../../store/session.js'
import "./index.css";

function ShoppingCartModal({ state, item, restaurant }) {
  const user = useSelector(state => state.session.user)
  const cart = useSelector(state => state.session.shoppingCart);

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  let total = 0

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();
    await dispatch(shoppingCartActions.clearShoppingCart(user.id));
    await dispatch(shoppingCartActions.addShoppingCartItem({ menu_item_id: item.id }, user.id, restaurant.id))
  };

  const handleSingleItemDelete = async (itemId) => {
    await dispatch(shoppingCartActions.deleteShoppingCartItem(itemId))
  }

  const handleCheckout = () => {
    history.push('/order');
    closeModal();
  }

  return (
    <>
      {state === 'confirmation' ?
        <div className="confirmModal">
          <h1 className="confirmModalTitle">{'Adding items from other restaurants clears your current cart, proceed?'}</h1>
          <form onSubmit={handleSubmit} className="confirmModalForm" id="formInfo">
            <button type="submit" className="confirmSubmit" onClick={handleSubmit}>Yes, start a new cart</button>
            <button type="submit" className="dontConfirmSubmit" onClick={() => closeModal()}>No, keep my current cart</button>
          </form>
        </div> :
        <div id='cart-modal'>
          {cart &&
            Object.values(cart).map((item) => {
              if (typeof item === 'number') return null;
              total += item.price;
              return (
                <li key={item.id} className='cart-list'>
                  <h4 >{item.name}</h4>
                  <p >${item.price}</p>
                  <TiDelete id='delete-single-btn' onClick={() => handleSingleItemDelete(item.id)} />
                </li>
              );
            })}
            <div className='checkout-container'>

          {cart && Object.values(cart).length > 1 && (
            <button
              id='checkout-button'
              onClick={handleCheckout}
            >Checkout</button>
          )}
          <h4 id='total'>Total: ${total.toFixed(2)}</h4>
            </div>
        </div>
      }
    </>
  );
}

export default ShoppingCartModal;
