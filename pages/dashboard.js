import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import firebase from 'firebase';
import UserForm from './UserForm';
import withFirebaseAuth, {
  WrappedComponentProps,
} from 'react-with-firebase-auth';
import firebaseConfig from "./firebaseConfig";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const Dashboard = function({
  user,
  error,
  loading,
  signOut,
}) {
  const router = useRouter();
  useEffect(() => {
    checkUser(user);
  }, []);

  useEffect(() => {
    checkUser(user);
  }, [user]);

  function checkUser(user) {
    if (user === null) {
      router.push("/");
    }
  }

  return (
    <div>
      <div>
          <Head>
            <title>Invisor - Dashboard</title>
            <link rel="stylesheet" href="/dashboardstyles.css" type="text/css" />
          </Head>
      </div>
      <div className="body">
        <div className="logo" id="myHeader">
          <a href="/" id="b">
            <img src="logo3.png" width="150.41" height="150 .39" />
            <h2 id="si">
              Smart <br />
              Invisor
            </h2>
          </a>

          <button title="Notifications" className="but noti1">
            <i className="fa fa-envelope" aria-label="Messages"></i>
          </button>
          <button title="Alerts" className="but noti2">
            <i
              className="fa fa-bell"
              aria-hidden="true"
              aria-label="Bell Notification"
            ></i>
          </button>
          <button onClick={(e) => signOut()} title="Profile" className="but user">
            <i className="fa fa-user" aria-label="Profile"></i>
          </button>
        </div>
        <div className="bodyC">
          <div id="sidebtns">
            <div id="sidebar">
              <button className="b1">
                <i
                  className="fa fa-line-chart"
                  aria-hidden="true"
                  aria-label="Chart"
                ></i>
                Overview
              </button>
            </div>
            <div className="into2">
              <button className="b2">
                <i
                  className="fa fa-history"
                  aria-hidden="true"
                  aria-label="Transaction History"
                ></i>
                Transaction
              </button>
            </div>
            <div className="into3">
              <button className="b3">
                <i className="fa fa-id-card" aria-hidden="true" aria-label="Card"></i>
                Cards
              </button>
            </div>
            <div className="into4">
              <button className="b4">
                <i className="fa fa-file" aria-hidden="true" aria-label="Invoice"></i>
                Invoices
              </button>
            </div>
            <div className="into5">
              <button className="b5">
                <i className="fa fa-cog" aria-hidden="true"></i>Settings
              </button>
            </div>
          </div>
          <div className="vl"></div>
          <div className="vl2"></div>
          <div className="search-container">
            <input
              type="text"
              name="search"
              placeholder="Search Stock..."
              className="search-input"
            />
            <a href="#" className="search-btn">
              <i className="fas fa-search"></i>{" "}
            </a>
          </div>

          <div className="comp_details">
            <a id="descp1" href="#">
              You can find all the details about the company here!
            </a>
            <p id="amnt">$ ___</p>
            <p id="val">Current Value</p>
          </div>
          <div className="rect">
            <button className="watch">
              Add To Watchlist <i className="fa fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
          <div id="graphs">
            <p id="graph1"></p>
            <p id="graph2"></p>
            <p id="trend">
              Trending Stocks
              <a
                href="https://www.investing.com/equities/trending-stocks"
                id="vew"
                target="_blank"
              >
                View All
              </a>
            </p>
            <p id="graph3"></p>
            <h2 className="pred">Prediction Result</h2>
            <p className="res">Next PRICE will be___</p>
          </div>
        </div>
      </div>
      <div className="footer-content">
        <footer>
          <h3>Invisor</h3>
          <p>
            Smart Invisor is an intelligent predictor for stocks. It use the
            stet-of-the art AI components to predict stocks price based on the news
            and numerical historical data.
          </p>
          <ul className="socials">
            <li>
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-google-plus"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-linkedin-square"></i>
              </a>
            </li>
          </ul>
          <div className="footer-bottom">
            <p>
              Copyright 2022 <a href="#">Smart Invisor</a>
            </p>
            <div className="footer-menu">
              <ul className="f-menu">
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
                <li>
                  <a href="">Blog</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

const firebaseAppAuth = firebaseApp.auth();

export default withFirebaseAuth({ firebaseAppAuth })(Dashboard);;
