import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const MainLayout = () => {
	

	return (
		<Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content >
        <Outlet />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
	);
};

export default MainLayout;
