import React, { useState } from "react";
import { infoData } from "types/microCmsData";
import { InferGetStaticPropsType, NextPage } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Style from "components/styles/contact.module.scss";
import { useRouter } from "next/router";
import axios from "axios";

export type Props = {};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Contact: NextPage<PageProps> = ({ info }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const url = process.env.contactEndPoint as string;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      email: email,
      name: name,
      body: body,
    };

    axios({
      method: "post",
      url: `${url}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        "X-WRITE-API-KEY": process.env.write_Api,
      },
    })
      .then(() => {
        router.push("/success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="index">
      <Layout
        title={`Contact | ${info[0].siteName}`}
        description={`Contact | ${info[0].description}`}
        favicon={`${info[0].favicon.url}`}
      >
        <Header />
        <Nav value={4} />
        <div className="contact">
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={Style.inner}>
              <Typography component="div">
                <h2 className={Style.title}>contact</h2>
                <Box component="div" className={Style.box}>
                  <label className={Style.label}>
                    氏名
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="氏名"
                      className={Style.inputText}
                    />
                  </label>
                </Box>
                <Box component="div" className={Style.box}>
                  <label className={Style.label}>
                    メールアドレス
                    <input
                      type="email"
                      name="email"
                      placeholder="メールアドレス"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={Style.inputText}
                    />
                  </label>
                </Box>
                <Box component="div" className={Style.box}>
                  <label className={Style.label}>
                    ご用件
                    <textarea
                      name="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className={Style.inputText}
                    />
                  </label>
                </Box>
                <Box component="div" className={Style.box}>
                  <button onClick={handleSubmit} className={Style.submit}>
                    お問い合わせする
                  </button>
                </Box>
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
    headers: {
      "X-API-KEY": process.env.apiKeyCms as string,
    },
  };

  const infoUrl = process.env.infoEndPoint as string;
  const info: infoData = await fetch(`${infoUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      info: info.contents,
    },
  };
};

export default Contact;
