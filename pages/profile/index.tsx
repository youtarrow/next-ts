import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export type Props = {};

const Profile: React.FC = () => {
  return (
    <div className="index">
      <Layout
        title={`Profile | Yu Ecchuya, Portfolio Site`}
        description={`Profile | Yu Ecchuya, Portfolio Site 技術的なブログをユルユルに更新しています。 私のプロフィールを掲載しています。`}
      >
        <Header />
        <Nav value={2} />
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Typography component="div">
              <h1>Profile</h1>
            </Typography>
          </Container>
        </React.Fragment>
        <Footer />
      </Layout>
    </div>
  );
};

export default Profile;
