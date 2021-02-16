import React from "react";
import { NextPage, GetStaticProps } from 'next';
import axios from 'axios';
import Layout from "components/Layout";
import Header from "components/Header";
import Nav from "components/Nav";
import Blog from "components/Blog";
import Link from "next/link";
import { microCmsData } from "types/microCmsData";

interface Props {
  dataList: Array<microCmsData>;
};

const Index: NextPage<Props> = ({ dataList }) => {
  return (
    <div className="index">
      <Layout title="Home | Next.js + TypeScript Example">
        <Header />
        <Nav />
        <Blog />

        <ul>
          {dataList.map((dataList) => (
            <li key={dataList.id}>
              <Link href={`blog/${dataList.id}`}>
                <a>{dataList.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  );
};

// 'X-API-KEY': string | undefined; をtsで定義できれば....
export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props
}> => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string }
  }
  const res = await axios.get(process.env.END_POINT + 'blog/', key)
  const data: Array<microCmsData> = await res.data.contents
  return {
    props: {
      dataList: data
    }
  }
}

export default Index;
