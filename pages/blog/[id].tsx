import React, { useRef, useEffect } from "react";
import cheerio from "cheerio";
import { MicroCmsData, MicroCmsBlog } from "types/microCmsData";
import { NextPage, InferGetStaticPropsType } from "next";
import Image from "next/image";
import fetch from "node-fetch";
import Link from "next/link";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import BlogId from "components/styles/blog_id.module.scss";

export type Props = {
  postBody: string;
  errors?: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogDetail: NextPage<PageProps> = ({ posts }) => {
  const $ = cheerio.load(posts.body);
  const headings = $("h2, h3").toArray();

  const postBody = `${posts.body}`;

  return (
    <>
      <div className="index">
        <Layout title={`${posts.title}`}>
          <Header />
          <Nav />
          <div className={BlogId.subdirectory}>
            <div className={BlogId.content}>
              <div className={BlogId.content__head}>
                <h1 className={BlogId.content__title}>{posts.title}</h1>
                <div className={BlogId.tags}>
                  <span className={BlogId.tags__icon}></span>
                  {/* <Link href={`${posts.tag[0].id}`}>
                    <a className={BlogId.tags__item}>{posts.tag[0].tagTitle}</a>
                  </Link> */}
                </div>
              </div>
              <div
                id="cmsPost"
                className={BlogId.details}
                dangerouslySetInnerHTML={{ __html: postBody }}
              ></div>
            </div>
            <div className={BlogId.sideMenu}>
              <ul className={BlogId.sideMenu__advertising}>
                <li className={BlogId.sideMenu__advList}>
                  <Image src="/300x300.png" width={300} height={300} />
                </li>
              </ul>
              <div className={BlogId.sideMenu__contents}>
                <ul className={BlogId.titleList}>
                  {headings.map((data: any, index) => (
                    <li key={index} className={BlogId.titleList__item}>
                      {data.name === "h2" && (
                        <Link href={`/blog/${posts.id}/#${data.attribs.id}`}>
                          <a className={BlogId.titleList__link}>
                            {data.children[0].data}
                          </a>
                        </Link>
                      )}
                      <ul className={BlogId.titleList__subList}>
                        <li className={BlogId.titleList__item}>
                          {data.name === "h3" && (
                            <Link
                              href={`/blog/${posts.id}/#${data.attribs.id}`}
                            >
                              <a className={BlogId.titleList__link}>
                                {data.children[0].data}
                              </a>
                            </Link>
                          )}
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
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
    props: {
      posts: data,
    },
  };
};

export default BlogDetail;
