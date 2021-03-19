import React from "react";
import { MicroCmsData, MicroCmsBlog } from "types/microCmsData";
import { NextPage, InferGetStaticPropsType } from "next";
import Image from "next/image";
import fetch from "node-fetch";
import Link from "next/link";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Style from "components/styles/style.module.scss";

export type Props = {
  postBody: string;
  errors?: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogDetail: NextPage<PageProps> = ({ posts }) => {
  const postBody = `${posts.body}`;

  return (
    <>
      <div className="index">
        <Layout title={`${posts.title}`}>
          <Header />
          <Nav />
          <div className={Style.subdirectory}>
            <div className={Style.content}>
              <div className={Style.content__head}>
                <h2 className={Style.content__title}>{posts.title}</h2>
                <div className={Style.tags}>
                  <span className={Style.tags__icon}></span>
                  <Link href={`/`}>
                    <a className={Style.tags__item}>{posts.tag[0].tagTitle}</a>
                  </Link>
                </div>
              </div>
              <div
                id="cmsPost"
                className={Style.details}
                dangerouslySetInnerHTML={{ __html: postBody }}
              ></div>
            </div>
            <div className={Style.sideMenu}>
              <ul className={Style.sideMenu__advertising}>
                <li className={Style.sideMenu__advList}>
                  <Image src="/300x300.png" width={300} height={300} />
                </li>
              </ul>
              <h3>テスト</h3>
              <ul>
                <li>リスト1</li>
                <li>リスト2</li>
                <li>リスト3</li>
              </ul>
            </div>
          </div>
          <Footer />
        </Layout>
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
