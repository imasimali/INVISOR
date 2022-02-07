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
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

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
  const [comp_name, setCompName] = useState("AAPL");
  const [comp_price, setCompPrice] = useState("___");
  const [prediction, setPrediction] = useState("___");
  const [comp_livedata, setComp_Livedata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const [comp_open, setCompOpen] = useState("Loading..");
  const [comp_high, setCompHigh] = useState("Loading..");
  const [comp_low, setCompLow] = useState("Loading..");

  useEffect(() => {
    checkUser(user);
  }, []);

  useEffect(() => {
    checkUser(user);
  }, [user]);

  async function runFUNC() {
    requestDetails();
    getMongo();
    requestPrediction();
  }

  async function requestPrediction() {
    setIsLoading(true);
    const res = await fetch(`https://01cf-34-68-122-37.ngrok.io/get?stock=${comp_name}`);
    const json = await res.json();
    setPrediction(json);
    // sendMongo();
    setIsLoading(false);
  }

  async function requestDetails() {
    setIsLoading(true);
    const res = await fetch(`/api/stockDetail?stock=${comp_name}`);
    const json = await res.json();
    setCompOpen(json.open[0]);
    setCompHigh(json.high[0]);
    setCompLow(json.low[0]);
    setCompPrice(json.close[0]);
    setIsLoading(false);
  }

  /*async function requestPriceData() {
    setIsLoading(true);
    const res = await fetch(`https://invisorlink.herokuapp.com/https://query1.finance.yahoo.com/v8/finance/chart/${comp_name}?region=US&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=15d`);
    const json = await res.json();
    setComp_Livedata(json);
    console.log(comp_livedata)
    setIsLoading(false);
  }*/

  async function requestLastPrice() {
    setIsLoading(true);
    const res = await fetch(`/api/lastprice?stock=${comp_name}`);
    const json = await res.json();
    setCompPrice(json);
    setIsLoading(false);
  }

  async function sendMongo(event) {
    const data = new FormData(event.target);

    const result = await fetch(`/api/mongo?stock=${comp_name}`, {
      method: "POST",
      body: JSON.stringify({
        symbol: data.symbol,
        close: data.close,
        pred: data.pred,
        date: data.date,
      }),
    })
      .then((response) => {
          console.log(response.status)
      })
  }

  async function getMongo() {
    const res = await fetch(`/api/mongo?stock=AAPL`);
    const json = await res.json()
    let data = json.map((obj) => {
      let date = obj.date //+ 'T05:00:00.000Z'
      obj.date = new Date(date)
      return obj
    })
    requestLastPrice()
    setChartData(data)
  }

  function checkUser(user) {
    if (user === null) {
      router.push("/");
    }
  }

  // console.log(chartData)

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
              value={comp_name}
              onChange={(e) => setCompName(e.target.value)}
              name="search"
              placeholder="Search Stock..."
              className="search-input"
            />
            <a onClick={() => runFUNC()} className="search-btn">
              <i className="fas fa-search"></i>
            </a>
          </div>

          <div className="comp_details">
            <p id="comp"> {comp_name}</p>
            <a id="descp1" href={`https://finance.yahoo.com/quote/${comp_name}`}>
              You can find all the details about the company here!
            </a>
            <p id="amnt">$ {comp_price}</p>
            <p id="val">Current Value</p>
          </div>
          <div className="rect">
            <button className="watch">
              Add To Watchlist <i className="fa fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
          <div id="graphs">
            <div id="graph1">
              {chartData != null ?
                <TypeChooser>
                  {type => <Chart type={type} data={chartData} />}
                </TypeChooser>
              : <>  Loading Chart </>}
            </div>
            <div id="graph2">
              <p id="open">Open</p>
              <p id="oamt">{comp_open}</p>
              <p id="high">High</p>
              <p id="hamt">{comp_high}</p>
              <p id="low">Low</p>
              <p id="lamt">{comp_low}</p>
              <p id="close">Close</p>
              <p id="camt">{comp_price}</p>
            </div>
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
            <div id="graph3">
              <table id="ttrend">
              <thead>
                <tr id="thead">
                  <th id="serial">#</th>
                  <th id="tname">Name</th>
                  <th id="tprice">Price/unit</th>
                  <th id="treturn">Return</th>
                </tr>
              </thead>
              </table>
              <table id="ttrend2" style={{width:'97%', color: 'black'}}>
              <tbody>
                <tr id="row1">
                  <td>1</td>
                  <td id="tcomp1">Apple</td>
                  <td id="tprice1">$172.5</td>
                  <td className="tsame" id="treturn1">+4.28</td>
                </tr>
                <tr id="row2">
                  <td>2</td>
                  <td id="tcomp2">IBM</td>
                  <td id="tprice2">$137.53</td>
                  <td className="tsame" id="treturn2">+3.19</td>
                </tr>
                <tr id="row3">
                  <td>3</td>
                  <td id="tcomp3">P&G</td>
                  <td id="tprice3">$160.92</td>
                  <td className="tsame" id="treturn3">-3.12</td>
                </tr>
                <tr id="row4">
                  <td>4</td>
                  <td id="tcomp4">Netflix</td>
                  <td id="tprice4">$399.52</td>
                  <td className="tsame" id="treturn4">+2.40</td>
                </tr>
                <tr id="row5">
                  <td>5</td>
                  <td id="tcomp5">Meta</td>
                  <td id="tprice5">$225.90</td>
                  <td className="tsame" id="treturn5">-7.89</td>
                </tr>
                <tr id="row6">
                  <td>6</td>
                  <td id="tcomp6">Amazon</td>
                  <td id="tprice6">$3,175.80</td>
                  <td className="tsame" id="treturn6">+1.29</td>
                </tr>
              </tbody>
              </table>
            </div>
            <h2 className="pred">Prediction Result</h2>
            {isLoading ? (
              <p className="res">Predicting next price ...</p>
            ) : (
            <p className="res">Next Price will be ${prediction}</p>
            )}
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
