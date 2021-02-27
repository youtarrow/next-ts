import React from "react";
import { NextPage, GetStaticProps } from "next";
import axios from "axios";
import Layout from "components/Layout";
import Header from "components/Header";
import Nav from "components/Nav";
import Blog from "components/Blog";
import Box from "@material-ui/core/Box";
import { microCmsData } from "types/microCmsData";
import Title from "components/Title";
import Style from "components/styles/style.module.scss";

export type Props = {
  dataList: Array<microCmsData>;
};

const Index: NextPage<Props> = ({ dataList }) => {
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
              {dataList.map((dataList) => (
                <Blog
                  key={dataList.id}
                  postId={`${dataList.id}`}
                  postTitle={
                    dataList.title.length > 30
                      ? dataList.title.slice(0, 30) + "…"
                      : dataList.title
                  }
                  postDate={`${dataList.createdAt}`}
                  postKv={`${dataList.kv.image.url}`}
                  postTags={`${dataList.tag}`}
                />
              ))}
            </Box>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY as string },
  };
  const res = await axios.get(process.env.END_POINT as string, key);
  const data: Array<microCmsData> = await res.data.contents;
  return {
    props: {
      dataList: data,
    },
  };
};

export default Index;
