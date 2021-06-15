import React from "react";
import { UserData, infoData } from "types/microCmsData";
import { InferGetStaticPropsType, NextPage } from "next";
import Header from "components/Header";
import FooterNav from "components/FooterNav";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Style from "components/styles/profile.module.scss";

export type Props = {};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Profile: NextPage<PageProps> = ({ user, info }) => {
  const introduction = `${user[0].introduction}`;
  const career = `${user[0].career}`;

  return (
    <div className="index">
      <Layout
        title={`Profile | ${info[0].siteName}`}
        description={`Profile | ${info[0].description}`}
        favicon={`${info[0].favicon.url}`}
      >
        <Header />
        <Nav value={2} />
        <div className="profile">
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className="container">
              <Typography component="div">
                <Box component="div" className={Style.title}>
                  <h2 className={Style.titleH2}>{user[0].name}</h2>
                  <h3 className={Style.titleH3}>{user[0].occupation}</h3>
                </Box>
                <Box component="div" className={Style.about}>
                  <h2 className={Style.aboutH2}>About Me</h2>
                  <div
                    className={Style.profile__text}
                    dangerouslySetInnerHTML={{ __html: introduction }}
                  ></div>
                </Box>
                <Box component="div">
                  <div
                    className={Style.profile__text}
                    dangerouslySetInnerHTML={{ __html: career }}
                  ></div>
                </Box>
              </Typography>
            </Container>
          </React.Fragment>
        </div>
        <FooterNav />
        <Footer />
      </Layout>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };
  const userUrl = process.env.userEndPoint as string;
  const user: UserData = await fetch(`${userUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  const infoUrl = process.env.infoEndPoint as string;
  const info: infoData = await fetch(`${infoUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      user: user.contents,
      info: info.contents,
    },
  };
};

export default Profile;
