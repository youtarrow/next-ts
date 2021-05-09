import React from "react";
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
import Typography from "@material-ui/core/Typography";
import Style from "components/styles/details.module.scss";

export type Props = {
  postBody: string;
  errors?: string;
  value: number;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogDetail: NextPage<PageProps> = ({ posts }) => {
  const $ = cheerio.load(posts.body);
  const headings = $("h2, h3").toArray();

  const postBody = `${posts.body}`;

  return (
    <>
      <div className="index">
        <Layout
          title={`${posts.title} | Yu Ecchuya, Portfolio Site`}
          description={`${posts.meta.metaDescription}`}
        >
          <Header />
          <Nav value={1} />
          <Typography component="div" className={Style.subdirectory}>
            <div className={Style.content}>
              <div className={Style.content__head}>
                <h1 className={Style.content__title}>{posts.title}</h1>
                <div className={Style.tags}>
                  <span className={Style.tags__icon}></span>
                  {posts.tag.map((posts, index) => (
                    <Link key={index} href={`/tags/${posts.id}/1/`}>
                      <a className={Style.tags__item}>{posts.tagTitle}</a>
                    </Link>
                  ))}
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
              <div className={Style.sideMenu__contents}>
                <ul className={Style.titleList}>
                  {headings.map((data: any, index) => (
                    <li key={index} className={Style.titleList__item}>
                      {data.name === "h2" && (
                        <Link href={`/blog/${posts.id}/#${data.attribs.id}`}>
                          <a className={Style.titleList__link}>
                            {data.children[0].data}
                          </a>
                        </Link>
                      )}
                      {data.name === "h3" && (
                        <Link href={`/blog/${posts.id}/#${data.attribs.id}`}>
                          <a
                            className={`${Style.titleList__link} ${Style.titleList__subLink}`}
                          >
                            {data.children[0].data}
                          </a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Typography>
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
  const data: MicroCmsBlog = await fetch(`${blogUrl}?offset=0&limit=100`, key)
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
