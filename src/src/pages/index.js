import React from 'react';
import Layout from '../components/Layout';
import { Switch, Route } from 'react-router-dom';
import Exchange from '../pages/exchange';
import Markets from '../pages/markets';
import Profile from './profile';
import Wallet from './wallet';
import Settings from './settings';
import Login from './login';
import Reset from './reset';
import OtpVerify from './otp-verify';
import OtpNumber from './otp-number';
import Lock from './lock';
import TermsAndConditions from './terms-and-conditions';
import NewsDetails from './news-details';
import Signup from './signup';
import Notfound from './notfound';

export default function index() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="cex/">
            <Exchange />
          </Route>
          <Route path="cex/markets">
            <Markets />
          </Route>
          <Route path="cex/profile">
            <Profile />
          </Route>
          <Route path="cex/wallet">
            <Wallet />
          </Route>
          <Route path="cex/settings">
            <Settings />
          </Route>
          <Route path="cex/login">
            <Login />
          </Route>
          <Route path="cex/signup">
            <Signup />
          </Route>
          <Route path="cex/reset">
            <Reset />
          </Route>
          <Route path="cex/otp-verify">
            <OtpVerify />
          </Route>
          <Route path="cex/otp-number">
            <OtpNumber />
          </Route>
          <Route path="cex/lock">
            <Lock />
          </Route>
          <Route path="cex/terms-and-conditions">
            <TermsAndConditions />
          </Route>
          <Route path="cex/news-details">
            <NewsDetails />
          </Route>
          <Route path="cex/notfound">
            <Notfound />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}
