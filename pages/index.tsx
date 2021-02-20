import React from "react";
import { NextPage, GetStaticProps } from "next";
import axios from "axios";
import Layout from "components/Layout";
import Header from "components/Header";
import Nav from "components/Nav";
import Blog from "components/Blog";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import { microCmsData } from "types/microCmsData";
import Title from "components/Title";
import Style from "components/styles/style.module.scss";

interface Props {
  dataList: Array<microCmsData>;
}

const Index: NextPage<Props> = ({ dataList }) => {
  return (
    <div className="index">
      <Layout title="Home | Next.js + TypeScript Example">
        <Header />
        <Nav />
        <div className="blog">
          <div className="inner">
            <Title title={"Contents"} className={Style.title} />
            <Box
              display="flex"
              flexWrap="wrap"
              bgcolor="background.paper"
              className={Style.blog__list}
            >
              {dataList.map((dataList) => (
                <Link key={dataList.id} href={`/blog/${dataList.id}`} >
                  <a><Blog postTitle={`${dataList.title}`} postDate={`${dataList.createdAt}`} /></a>
                </Link>
              ))}
            </Box>
          </div>
        </div>
      </Layout>
    </div>
  );
};

// 'X-API-KEY': string | undefined; をtsで定義できれば....
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
