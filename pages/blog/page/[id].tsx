import React, { useCallback } from "react";
import { Pagination } from "@material-ui/lab/";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { MicroCmsBlog } from "types/microCmsData";
import { NextPage, InferGetStaticPropsType } from "next";
import fetch from "node-fetch";
import Header from "components/Header";
import Nav from "components/Nav";
import Layout from "components/Layout";
import Footer from "components/Footer";
import Blog from "components/Blog";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// import Style from "components/styles/articles.module.scss";

export type StaticProps = {
  errors?: string;
  value: number;
};

const PER_PAGE = 6;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    ul: {
      "& > *": {
        justifyContent: "center",
      },
    },
  })
);

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PageId: NextPage<PageProps> = ({ posts, totalCount }) => {
  const classes = useStyles();
  const router = useRouter();
  const pageId = router.query.id
    ? Number.parseInt(String(router.query.id), 10)
    : 1;

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      void router.push(`/blog/page/${page}`);
    },
    [router]
  );

  return (
    <div className="index">
      <Layout
        title={`記事一覧 ${pageId}ページ目 | Yu Ecchuya, Portfolio Site`}
        description={`記事一覧 ${pageId}ページ目 | Yu Ecchuya, Portfolio Site 技術的なブログをユルユルに更新しています。`}
      >
        <Header />
        <Nav value={1} />
        <Typography component="div" className="blog">
          <div className="inner">
            <Box
              display="flex"
              flexWrap="wrap"
              className="blog__list"
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
          <div className={classes.root}>
            <Pagination
              className={classes.ul}
              variant="outlined"
              shape="rounded"
              count={Math.ceil(totalCount / PER_PAGE)}
              page={pageId}
              onChange={handleChange}
            />
          </div>
        </Typography>
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
  const paths = range(1, Math.ceil(data.totalCount / PER_PAGE)).map(
    (resNum) => `/blog/page/${resNum}`
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;

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
