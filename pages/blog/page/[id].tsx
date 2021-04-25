import React, { useCallback } from "react";
import { MicroCmsBlog } from "types/microCmsData";
import { NextPage, InferGetStaticPropsType } from "next";
import fetch from "node-fetch";
import { useRouter } from "next/router";
import { Pagination } from "@material-ui/lab";
import Header from "components/Header";
import Nav from "components/Nav";
import Layout from "components/Layout";
import Footer from "components/Footer";
import Blog from "components/Blog";
import Box from "@material-ui/core/Box";
import Title from "components/Title";
import Style from "components/styles/style.module.scss";

const PAGE = 6;

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PageId: NextPage<PageProps> = ({ posts, totalCount }) => {
  const router = useRouter();
  const offset = router.query.offset
    ? Number.parseInt(String(router.query.offset), 10)
    : 1;

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      void router.push(`/blog/page/${page}`);
    },
    [router]
  );
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
          </div>
          <Pagination
            count={PAGE}
            variant="outlined"
            shape="rounded"
            color="secondary"
            page={offset}
            onChange={handleChangePage}
          />
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };
  const blogUrl = process.env.blogEndPoint as string;
  const data: MicroCmsBlog = await fetch(`${blogUrl}`, key)
    .then((res) => res.json())
    .catch(() => null);

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(data.totalCount / PAGE)).map(
    (resNum) => `/blog/page/${resNum}`
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  console.log(id);

  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };
  const blogUrl = process.env.blogEndPoint as string;
  const data: MicroCmsBlog = await fetch(
    `${blogUrl}?offset=${(id - 1) * 6}&limit=6`,
    key
  )
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export default PageId;
