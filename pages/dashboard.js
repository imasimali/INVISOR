import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"
import firebase from 'firebase'
import UserForm from './UserForm'
import withFirebaseAuth, {
  WrappedComponentProps,
} from 'react-with-firebase-auth'

const Dashboard = function({
  user,
  error,
  loading,
  signOut
}) {
  return (
  <div class="body">
    <div class="logo">
      <a href="page1.html" id="b"
        ><img src="logo2.png" width="100.41" height="101 .39" />
        <h2 id="si">Smart <br />Invisor</h2></a
      >

      <button title="Notifications" class="but noti1">
        <i class="fa fa-envelope" aria-label="Messages"></i>
      </button>
      <button title="Alerts" class="but noti2">
        <i
          class="fa fa-bell"
          aria-hidden="true"
          aria-label="Bell Notification"
        ></i>
      </button>
      <button title="Profile" class="but user">
        <i class="fa fa-user" aria-label="Profile"></i>
      </button>
    </div>
    <div class="bodyC">
      <div id="sidebtns">
        <div id="sidebar">
          <button class="b1">
            <i class="fa fa-line-chart" aria-hidden="true" aria-label="Chart"></i>
            Overview
          </button>
        </div>
        <div class="into2">
          <button class="b2">
            <i
              class="fa fa-history"
              aria-hidden="true"
              aria-label="Transaction History"
            ></i>
            Transaction
          </button>
        </div>
        <div class="into3">
          <button class="b3">
            <i class="fa fa-id-card" aria-hidden="true" aria-label="Card"></i
            >Cards
          </button>
        </div>
        <div class="into4">
          <button class="b4">
            <i class="fa fa-file" aria-hidden="true" aria-label="Invoice"></i
            >Invoices
          </button>
        </div>
        <div class="into5">
          <button class="b5">
            <i class="fa fa-cog" aria-hidden="true"></i>Settings
          </button>
        </div>
      </div>
      <div class="vl"></div>
      <div class="vl2"></div>
      <div class="comp_details">
        <p id="comp">Company Name....</p>
        <a id="descp1" href="#"
          >You can find all the details about the company here!</a
        >
        <p id="amnt">$ 27.89</p>
        <p id="val">Current Value</p>
      </div>
      <div class="rect">
        <button class="watch">
          Add To Watchlist <i class="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      </div>
      <div id="graphs">
        <p id="graph1"></p>
        <p id="graph2"></p>
        <p id="trend">
          Trending Stocks<a
            href="https://www.investing.com/equities/trending-stocks"
            id="vew"
            target="_blank"
            >View All</a
          >
        </p>
        <p id="graph3"></p>
        <h2 class="pred">Prediction Result</h2>
        <p class="res">Next PRICE will be___</p>
      </div>
    </div>
  </div>
  )
}

export default Dashboard;
