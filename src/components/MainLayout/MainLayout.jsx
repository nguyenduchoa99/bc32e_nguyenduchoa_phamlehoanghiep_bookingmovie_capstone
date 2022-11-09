import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import mainLayout from './mainLayout.module.scss'

const MainLayout = () => {
	

	return (
		<Layout>
      <Layout.Header className={mainLayout.mainHeader}>
        <Header />
      </Layout.Header>
      <Layout.Content >
        <Outlet />
      </Layout.Content>
      {/* <Layout.Footer style={{width:"100%", height:""}}>
      </Layout.Footer> */}
        <Footer />

    </Layout>
	);
};

export default MainLayout;
