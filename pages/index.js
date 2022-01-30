import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import firebase from "firebase";
import UserForm from "./UserForm";
import withFirebaseAuth, {
  WrappedComponentProps,
} from "react-with-firebase-auth";
import firebaseConfig from "./firebaseConfig";
import Link from "next/link";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const FormWrapper = ({ children }) => (
  <div>
    <div style={{ marginLeft: "1.34em" }}>{children}</div>
    <hr />
  </div>
);

const Home = function({
  user,
  error,
  loading,
  setError,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // checkUser(user);
  }, []);

  useEffect(() => {
    checkUser(user);
  }, [user]);

  function checkUser(user) {
    if (user != null) {
      // router.push("/dashboard");
    }
  }

  function handleSubmit(e){
    signInWithEmailAndPassword(email, password);
  }

  // <React.Fragment>
  //   {loading && <Loading />}
  // </React.Fragment>

  // <Head>  </Head>

  return (
    <div>
      {loading && <Loading />}
      <div className="bg-img"></div>
      <div className="header" id="myheader">
        <a className="logo">
          <img src="logo3.png" height="180" width="180" />
        </a>
        <a href="#" className="about">
          <button className="b3" title="About Us">
            About
          </button>
        </a>
        <a href="#" className="contact">
          <button className="b4" title="Contact Us">
            Contact
          </button>
        </a>
        <a href="#" className="services">
          <button className="b5" title="Services we offer">
            Services
          </button>
        </a>
        <a href="#" className="team">
          <button className="b6" title="Meet our Team">
            Team
          </button>
        </a>
      </div>
      <div className="welcome">
        <h1>Welcome to Invisor!</h1>
        <h3 className="desp">
          A smart investment guide for our valued customers.
        </h3>
      </div>

      <div className="vl"></div>
      <div id="login">
        <h1>Member Login</h1>
        <form onSubmit={ (e) => {e.preventDefault(); handleSubmit(e); }}>
          <div className="username">
            <input type="text" value={email} onChange={setEmail} required />
            <span></span>
            <label id="uid">Username</label>
          </div>
          <div className="username">
            <input type="password" value={password}onChange={setPassword} required />
            <span></span>
            <label id="lbs">Password</label>
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a member? <a href="">SignUp</a>
          </div>
        </form>
        <div className="exp1">
          <h3> Our Mission </h3>
          <p>
            At Invisor our mission is to provide people belonging to different
            socio-economic backgrounds with a platform that enables them to gain
            financial independence by increasing litreacy about public equity
            markets.
          </p>
        </div>
        <div className="exp2">
          <h3>We would love to hear from you</h3>
          <ul className="socials">
            <li>
              <a href="">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-google-plus"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-linkedin-square"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Loading = () => (
  <div
    style={{
      position: "fixed",
      display: "flex",
      top: 0,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "2.68em",
      background: "green",
      color: "white",
    }}
  >
    Loading..
  </div>
);

const firebaseAppAuth = firebaseApp.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

export default withFirebaseAuth({ firebaseAppAuth })(Home);