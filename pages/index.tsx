import React from "react";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SiteTitle from "components/SiteTitle";
import TopMenu from "components/TopMenu";
import FooterNav from "components/FooterNav";
import Footer from "components/Footer";

const Index: React.FC = () => {
  return (
    <div className="home" style={{ paddingTop: "50px" }}>
      <Layout
        title="Home | Yu Ecchuya, Portfolio Site"
        description={`Yu Ecchuya, Portfolio Site 技術的なブログをユルユルに更新しています。`}
      >
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Typography component="div">
              <SiteTitle />
              <TopMenu />
            </Typography>
          </Container>
        </React.Fragment>
        <FooterNav />
        <Footer />
      </Layout>
    </div>
  );
};

export default Index;
