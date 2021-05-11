import React, { useCallback } from "react";
import { Pagination } from "@material-ui/lab/";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { MicroCmsBlog, UserData, infoData } from "types/microCmsData";
import { NextPage, InferGetServerSidePropsType } from "next";
import fetch from "node-fetch";
import Layout from "components/Layout";
import Footer from "components/Footer";
import Header from "components/Header";
import Nav from "components/Nav";
import Title from "components/Title";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Style from "components/styles/tags.module.scss";

const PER_PAGE = 6;

// const useStyles = makeStyles((theme) =>
const useStyles = makeStyles((theme: Theme) =>
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
    large: {
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
  })
);

export type StaticProps = {
  errors?: string;
  value: number;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Tags: NextPage<PageProps> = ({
  posts,
  keyWord,
  totalCount,
  user,
  info,
}) => {
  const postBody = `${user[0].introduction}`;

  const classes = useStyles();
  const router = useRouter();

  const name: any = posts.filter((posts) => {
    return posts.tag[0].id === keyWord;
  });

  const pageNum = router.query.id
    ? Number.parseInt(String(router.query.id), 10)
    : 1;

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      void router.push(`/tags/${keyWord}/${page}`);
    },
    [router]
  );

  return (
    <>
      <div className="index">
        <Layout
          title={`タグ一覧 ${name[0].tag[0].tagTitle} | ${info[0].siteName}`}
          description={`タグ一覧 ${name[0].tag[0].tagTitle} | ${info[0].description}`}
          favicon={`${info[0].favicon.url}`}
        >
          <Header />
          <Nav value={1} />
          <Typography component="div" className="tagSlug">
            <div className={Style.subdirectory}>
              <div className={Style.sideMenu}>
                <div className={Style.profile}>
                  <h2 className={Style.profile__title}>▼ Profile</h2>
                  <ul className={Style.myName}>
                    <li className={Style.myName__item}>
                      <Avatar
                        alt="User Icon"
                        src={`${user[0].image.url}`}
                        className={classes.large}
                      />
                    </li>
                    <li className={Style.myName__item}>{user[0].name}</li>
                  </ul>
                  <div className={Style.sns}>
                    <Link href={`${user[0].git}`}>
                      <a className={Style.sns__item} target="_blank">
                        <Avatar alt="Git Icon" src={`/github.svg`} />
                      </a>
                    </Link>
                    <Link href={`${user[0].twitter}`}>
                      <a className={Style.sns__item} target="_blank">
                        <Avatar alt="Twitter Icon" src={`/twitter.svg`} />
                      </a>
                    </Link>
                  </div>
                  <div
                    className={Style.profile__text}
                    dangerouslySetInnerHTML={{ __html: postBody }}
                  ></div>
                  <p className={Style.profile__link}>
                    <a href="/contact/">Contact Us</a>
                  </p>
                </div>
              </div>
              <div className={Style.content}>
                <Title title={`${name[0].tag[0].tagTitle}`} />
                <ul className={Style.list}>
                  {posts.map((posts, index) => (
                    <li key={index} className={Style.list__item}>
                      <div className={Style.tags}>
                        <span className={Style.tags__icon}></span>
                        {posts.tag.map((posts, index) => (
                          <Link key={index} href={`/tags/${posts.id}/1/`}>
                            <a
                              className={`${Style.tags__item} ${Style.tags__item__option}`}
                            >
                              {posts.tagTitle}
                            </a>
                          </Link>
                        ))}
                      </div>
                      <div className={Style.news}>
                        <p className={Style.news__title}>
                          <Link href={`/blog/${posts.id}`}>
                            <a
                              className={Style.news__link}
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
          </Typography>
          <Footer />
        </Layout>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const pageVal = context.query;
  const keyword = pageVal.slug;
  const id = pageVal.id;

  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };
  const blogUrl = process.env.blogEndPoint as string;
  const userUrl = process.env.userEndPoint as string;

  const data: MicroCmsBlog = await fetch(
    `${blogUrl}?offset=${
      (id - 1) * 6
    }&limit=100&filters=tag[contains]${keyword}`,
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  const user: UserData = await fetch(`${userUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  const infoUrl = process.env.infoEndPoint as string;
  const info: infoData = await fetch(`${infoUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      posts: data.contents,
      keyWord: keyword,
      totalCount: data.totalCount,
      user: user.contents,
      info: info.contents,
    },
  };
};

export default Tags;
