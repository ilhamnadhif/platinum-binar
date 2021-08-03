import React, { Fragment } from "react";
import Head from "next/head";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <link
          rel="icon"
          href="https://pbs.twimg.com/profile_images/1074422305281892352/RUeRc0W-.jpg"
        />
      </Head>
      <Navbar />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
