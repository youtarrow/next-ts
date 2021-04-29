import React, { useCallback } from "react";
import { Pagination } from "@material-ui/lab/";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { MicroCmsBlog } from "types/microCmsData";
import { NextPage, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import fetch from "node-fetch";
import Layout from "components/Layout";
import Footer from "components/Footer";
import Header from "components/Header";
import Nav from "components/Nav";
import Link from "next/link";
import TagsLo from "components/styles/tags.module.scss";

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

export type StaticProps = {
  errors?: string;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Tags: NextPage<PageProps> = ({ posts, keyWord, totalCount }) => {
  const classes = useStyles();
  const router = useRouter();

  const pageNum = router.query.id
    ? Number.parseInt(String(router.query.id), 10)
    : 1;

  console.log(router);

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      void router.push(`/tags/${keyWord}/${page}`);
    },
    [router]
  );

  console.log(keyWord);

  return (
    <>
      <div className="index">
        <Layout title="XXXX 記事一覧 | Next.js + TypeScript Example">
          <Header />
          <Nav />
          <div className={TagsLo.subdirectory}>
            <div className={TagsLo.sideMenu}>
              <h1 className={TagsLo.sideMenu__title}>
                <span>{keyWord}</span>
              </h1>
              <div className={TagsLo.profile}>
                <h2 className={TagsLo.profile__title}>▼ Profile</h2>
                <ul className={TagsLo.myName}>
                  <li className={TagsLo.myName__item}>
                    <figure className={TagsLo.myName__figure}>
                      <Image src="/300x300.png" width={100} height={100} />
                    </figure>
                  </li>
                  <li className={TagsLo.myName__item}>My Name</li>
                </ul>
                <div className={TagsLo.sns}>
                  <Link href="/">
                    <a className={TagsLo.sns__item}>
                      <Image src="/github.svg" width={100} height={100} />
                    </a>
                  </Link>
                  <Link href="/">
                    <a className={TagsLo.sns__item}>
                      <Image src="/twitter.svg" width={100} height={100} />
                    </a>
                  </Link>
                </div>
                <p className={TagsLo.profile__text}>
                  テストテストテストテスト テスト テストテスト テスト テスト
                  テスト テスト テスト テスト
                </p>
                <p className={TagsLo.profile__link}>
                  <a href="">Contact Us</a>
                </p>
              </div>
            </div>
            <div className={TagsLo.content}>
              {/* <Title title={`${keyWord}`} /> */}
              <ul className={TagsLo.list}>
                {posts.map((posts, index) => (
                  <li key={index} className={TagsLo.list__item}>
                    <div className={TagsLo.tags}>
                      <span className={TagsLo.tags__icon}></span>
                      {posts.tag.map((posts, index) => (
                        <Link key={index} href={`/tags/${posts.id}`}>
                          <a
                            className={`${TagsLo.tags__item} ${TagsLo.tags__item__option}`}
                          >
                            {posts.tagTitle}
                          </a>
                        </Link>
                      ))}
                    </div>
                    <div className={TagsLo.news}>
                      <p className={TagsLo.news__title}>
                        <Link href={`/blog/${posts.id}`}>
                          <a
                            className={TagsLo.news__link}
                          >{`${posts.title}`}</a>
                        </Link>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={classes.root}>
                <Pagination
                  className={classes.ul}
                  variant="outlined"
                  shape="rounded"
                  count={Math.ceil(totalCount / PER_PAGE)}
                  page={pageNum}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <Footer />
        </Layout>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const keyword = context.query.slug;

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
      totalCount: data.totalCount,
    },
  };
};

export default Tags;
