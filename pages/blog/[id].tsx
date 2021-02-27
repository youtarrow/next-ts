import { microCmsData } from "types/microCmsData";
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'

export type Props = {
  dataList: microCmsData;
  postBody: string;
  errors?: string;
}

const BlogDetail: NextPage<Props> = (props) => {
  const postBody = `${props.dataList.body}`;

  return (
    <>
      <Head>
        <title>ブログ詳細</title>
      </Head>
      <Link href="/">
        <a className="link">ブログトップへ</a>
      </Link>
      <div className="article">
        <h2 className="article__title">{props.dataList.title}</h2>
        <p className="article__tag">タグ：{props.dataList.tag}</p>
        <div dangerouslySetInnerHTML={{ __html: postBody }}></div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY as string }
    }
    const res = await axios.get(process.env.END_POINT + '?limit=9999', key)
    const data: Array<microCmsData> = await res.data.contents
    const paths = data.map((item) => ({
      params: { id: item.id.toString() }
    }))
    return { paths, fallback: false }
  }

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY }
    }
    const res = await axios.get(
      process.env.END_POINT as string + params?.id,
      key
    )
    const data: Props = await res.data
    return {
      props: { dataList: data }
    }
  }

export default BlogDetail