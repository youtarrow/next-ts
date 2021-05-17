import React from "react";
import { infoData, PortfolioData } from "types/microCmsData";
import { InferGetStaticPropsType, NextPage } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Image from "next/image";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Style from "components/styles/portfolio.module.scss";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import dayjs from "dayjs";

export type Props = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
    inlineBlock: {
      display: "inline-block",
    },
  })
);

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Portfolio: NextPage<PageProps> = ({ info, portfolio }) => {
  const comment = `${portfolio[0].comment}`;
  const classes = useStyles();

  return (
    <div className="index">
      <Layout
        title={`Portfolio | ${info[0].siteName}`}
        description={`Portfolio | ${info[0].description}`}
        favicon={`${info[0].favicon.url}`}
      >
        <Header />
        <Nav value={3} />
        <div className="portfolio">
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
              <Typography component="div">
                <Grid
                  container
                  className={`${classes.root} ${Style.contentArea}`}
                  spacing={6}
                  wrap="wrap"
                >
                  <Grid item xs={4} className={Style.contentArea__left}>
                    <Image
                      src={`${portfolio[0].siteImage.url}`}
                      width={600}
                      height={400}
                    />
                    <Box component="div" className={Style.linkArea} m={1}>
                      <ButtonGroup disableElevation variant="contained">
                        <Button
                          className={Style.linkArea__link}
                          href={`${portfolio[0].siteUrl}`}
                        >
                          <Image src="/link.svg" width={45} height={25} />
                        </Button>
                        <Button
                          className={`${Style.linkArea__link} ${Style.linkArea__linkOption}`}
                          href={`${portfolio[0].git}`}
                          target="_blank"
                        >
                          <Image src="/btnGit.svg" width={45} height={25} />
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Grid>
                  <Grid item xs={8} className={Style.contentArea__right}>
                    <Box component="div" className={Style.title}>
                      <h2 className={Style.titleH2}>{portfolio[0].siteName}</h2>
                    </Box>
                    <p className={Style.timeStamp}>
                      公開日：
                      {`${dayjs(portfolio[0].date).format("YYYY年MM月DD日")}`}
                    </p>
                    <Grid
                      component="ul"
                      container
                      className={Style.framework}
                      wrap="wrap"
                      spacing={2}
                    >
                      {portfolio[0].framework.map((portfolio, index) => (
                        <Grid
                          key={index}
                          component="li"
                          item
                          className={Style.framework__item}
                        >
                          {portfolio.tagTitle}
                        </Grid>
                      ))}
                    </Grid>
                    <div
                      className={Style.comment}
                      dangerouslySetInnerHTML={{ __html: comment }}
                    ></div>
                  </Grid>
                </Grid>
              </Typography>
            </Container>
          </React.Fragment>
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };

  const infoUrl = process.env.infoEndPoint as string;
  const info: infoData = await fetch(`${infoUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  const portfolioUrl = process.env.portfolioEndPoint as string;
  const portfolio: PortfolioData = await fetch(`${portfolioUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      info: info.contents,
      portfolio: portfolio.contents,
    },
  };
};

export default Portfolio;
