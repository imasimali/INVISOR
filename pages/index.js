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
import firebaseConfig from './firebaseConfig';
import Dashboard from './dashboard';
import Link from 'next/link'

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const FormWrapper = ({ children }) => (
  <>
    <div style={{ marginLeft: '1.34em' }}>{children}</div>
    <hr />
  </>
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

  useEffect(() => {
    // checkUser(user);
  }, []);

  useEffect(() => {
    checkUser(user);
  }, [user]);

  function checkUser(user){
    if (user != null) {
      router.push('/dashboard');
    }
  }

  return (

    <React.Fragment>
      {loading && <Loading />}
      <FormWrapper>
        <h1>create user</h1>
        <UserForm onSubmit={createUserWithEmailAndPassword} />
      </FormWrapper>

      <FormWrapper>
        <h1>sign in</h1>
        <UserForm onSubmit={signInWithEmailAndPassword} />
      </FormWrapper>

      <FormWrapper>
        <h1>sign out</h1>
        <button onClick={signOut}>sign out</button>
      </FormWrapper>

      <FormWrapper>
        <h1>clear error</h1>
        <button onClick={() => setError(null)}>clear error</button>
      </FormWrapper>

      <FormWrapper>
        <h1>user data</h1>
        <textarea
          style={{ width: 350, height: 200 }}
          value={JSON.stringify(user, null, 2)}
        />
      </FormWrapper>

      <FormWrapper>
        <h1>error data</h1>
        <textarea style={{ width: 350, height: 200 }} value={error} />
      </FormWrapper>
    </React.Fragment>
  )
}

const Loading = () => (
  <div
    style={{
      position: 'fixed',
      display: 'flex',
      top: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '2.68em',
      background: 'green',
      color: 'white',
    }}>
    Loading..
  </div>
);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Home);
