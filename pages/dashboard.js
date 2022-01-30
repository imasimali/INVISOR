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
  setError,
  signOut,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
  createUserWithEmailAndPassword,
}) {
  return (
    <h1>Hello Boi </h1>
  )
}

export default Dashboard;
