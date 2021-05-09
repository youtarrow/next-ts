import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export type Props = {};

const Contact: React.FC = () => {
  return (
    <div className="index">
      <Layout title={`Profile | Next.js + TypeScript Example`}>
        <Header />
        <Nav value={3} />
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Typography component="div">
              <h1>Contact</h1>
            </Typography>
          </Container>
        </React.Fragment>
        <Footer />
      </Layout>
    </div>
  );
};

export default Contact;
