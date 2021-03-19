import React from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import fetch from "node-fetch";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Blog from "components/Blog";
import Box from "@material-ui/core/Box";
import { MicroCmsBlog } from "types/microCmsData";
import Title from "components/Title";
import Style from "components/styles/style.module.scss";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<PageProps> = ({ posts }) => {
  return (
    <div className="index">
      <Layout title="Home | Next.js + TypeScript Example">
        <Header />
        <Nav />
        <div className="blog">
          <div className="inner">
            <Title title={"Contents"} />
            <Box
              display="flex"
              flexWrap="wrap"
              className={Style.blog__list}
              component="ul"
            >
              {posts.map((posts, index) => (
                <Blog
                  key={index}
                  postId={`${posts.id}`}
                  postTitle={
                    posts.title.length > 30
                      ? posts.title.slice(0, 30) + "…"
                      : posts.title
                  }
                  postDate={`${posts.createdAt}`}
                  postKv={`${posts.kv.image.url}`}
                  postTags={`${posts.tag[0].tagTitle}`}
                  postTagId={`${posts.tag[0].id}`}
                />
              ))}
            </Box>
            {/* {process.env.apiKeyCms}
            <br></br>
            {process.env.blogEndPoint}
            <br></br>
            {process.env.tagsEndPoint} */}
          </div>
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
  const blogUrl = process.env.blogEndPoint as string;
  const data: MicroCmsBlog = await fetch(`${blogUrl}?offset=0&limit=100`, key)
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: { posts: data.contents },
  };
};

export default Index;
