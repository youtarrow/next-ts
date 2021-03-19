import React from "react";
import { MicroCmsBlog } from "types/microCmsData";
import { NextPage, InferGetServerSidePropsType } from "next";
import fetch from "node-fetch";
import Layout from "components/Layout";
import Header from "components/Header";
import Nav from "components/Nav";
import Link from "next/link";
import Title from "components/Title";

export type StaticProps = {
  errors?: string;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Tags: NextPage<PageProps> = ({ posts, keyWord }) => {
  return (
    <>
      <div className="index">
        <Layout title="XXXX 記事一覧 | Next.js + TypeScript Example">
          <Header />
          <Nav />
          <Link href="/">
            <a className="link">ブログトップへ</a>
          </Link>
          <div className="article">
            <Title title={`${keyWord}`} />

            <ul>
              {posts.map((posts, index) => (
                <li key={index} className="article__tag">
                  タグ：{`${posts.tag[0].tagTitle}`}
                  <p>{`${posts.title}`}</p>
                </li>
              ))}
            </ul>
          </div>
        </Layout>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const keyword = context.query.id;

  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };
  const blogUrl = process.env.blogEndPoint as string;
  const data: MicroCmsBlog = await fetch(
    `${blogUrl}?offset=0&limit=100&filters=tag[contains]${keyword}`,
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      posts: data.contents,
      keyWord: keyword,
    },
  };
};

export default Tags;
