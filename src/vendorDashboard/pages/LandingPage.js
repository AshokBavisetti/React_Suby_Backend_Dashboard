import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import AllProducts from "../components/forms/AllProducts";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [allProducts, setAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  // ✅ Fix 1: Proper login check
  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    const firmName = localStorage.getItem("firmName");

    if (loginToken) {
      setShowLogOut(true);
    }

    if (firmName) {
      setShowFirmTitle(false);
    }
  }, []);

  const logOutHandler = () => {
    const confirmLogout = window.confirm("Are you sure to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");

    setShowLogOut(false);
    setShowFirm(false);
    setShowProduct(false);
    setAllProducts(false);
    setShowFirmTitle(true);
    setShowLogin(true);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowProduct(false);
    setShowFirm(false);
    setAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowProduct(false);
    setShowFirm(false);
    setAllProducts(false);
  };

  const showFirmHandler = () => {
    const token = localStorage.getItem("loginToken");

    if (token) {
      setShowFirm(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(false);
      setAllProducts(false);
    } else {
      alert("Please login");
      setShowLogin(true);
          setShowRegister(false);

    }
  };

  const showProductHandler = () => {
    const token = localStorage.getItem("loginToken");

    if (token) {
      setShowProduct(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setAllProducts(false);
    } else {
      alert("Please login");
      setShowLogin(true);
                setShowRegister(false);

    }
  };

  const showAllProductsHandler = () => {
    const token = localStorage.getItem("loginToken");

    if (token) {
      setAllProducts(true);
      setShowProduct(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
    } else {
      alert("Please login");
      setShowLogin(true);
                setShowRegister(false);

    }
  };

  return (
    <>
      <section className="landingSection">
        <Navbar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />

        <div className="collectionSection">
          <Sidebar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProducts={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />

          {showLogin && (
            <Login
              setShowLogOut={setShowLogOut}
              setShowFirm={setShowFirm} // 👈 important
              setShowFirmTitle={setShowFirmTitle}
              setShowLogin={setShowLogin}
            />
          )}

          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogOut && (
            <AddFirm showProductHandler={showProductHandler} />
          )}
          {showProduct && showLogOut && (
            <AddProduct showAllProducts={showAllProductsHandler} />
          )}
          {allProducts && showLogOut && <AllProducts />}
        </div>
      </section>
    </>
  );
}
