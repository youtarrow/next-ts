import React from "react";
import { MicroCmsData, MicroCmsBlog } from "types/microCmsData";
import { NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import fetch from "node-fetch";

export type Props = {
  postBody: string;
  errors?: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogDetail: NextPage<PageProps> = ({ posts }) => {
  const postBody = `${posts.body}`;

  return (
    <>
      <Head>
        <title>ブログ詳細</title>
      </Head>
      <Link href="/">
        <a className="link">ブログトップへ</a>
      </Link>
      <div className="article">
        <h2 className="article__title">{posts.title}</h2>
        <p className="article__tag">タグ：{posts.tag[0].tagTitle}</p>
        <div dangerouslySetInnerHTML={{ __html: postBody }}></div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };
  const blogUrl = process.env.blogEndPoint as string;
  const data: MicroCmsBlog = await fetch(blogUrl, key)
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };
  const blogUrl = process.env.blogEndPoint as string;
  const res = await fetch(`${blogUrl}/${id}`, key);
  const data: MicroCmsData = await res.json();
  return {
    props: { posts: data },
  };
};

export default BlogDetail;
