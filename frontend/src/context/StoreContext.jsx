import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const qty = prev[itemId] || 0;
      return { ...prev, [itemId]: qty + 1 };
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (err) {
        console.error("addToCart failed:", err);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const qty = Math.max((prev[itemId] || 0) - 1, 0);
      const next = { ...prev, [itemId]: qty };
      if (qty === 0) delete next[itemId];
      return next;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (err) {
        console.error("removeFromCart failed:", err);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const qty = cartItems[itemId];
      if (qty > 0) {
        const itemInfo = food_list.find((p) => p._id === itemId);
        if (itemInfo && typeof itemInfo.price === "number") {
          totalAmount += itemInfo.price * qty;
        } else {
          console.warn("Missing item info for", itemId);
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      const data = response?.data?.data;
      if (Array.isArray(data)) setFoodList(data);
      else console.warn("Unexpected food list response:", response.data);
    } catch (err) {
      console.error("fetchFoodList error:", err);
    }
  };

  const loadCartData = async (t) => {
    if (!t) return;
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: t } });
      const cart = response?.data?.loadCartData;
      if (cart && typeof cart === "object") {
        setCartItems(cart);
      } else {
        console.warn("Unexpected cart response:", response.data);
      }
    } catch (err) {
      console.error("loadCartData error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;