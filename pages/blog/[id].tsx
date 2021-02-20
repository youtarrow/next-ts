import { microCmsData } from "types/microCmsData";
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'

export type Props = {
  blog: microCmsData
  errors?: string
}

const BlogDetail: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>ブログ詳細</title>
      </Head>
      <h1 className="title">ブログ詳細</h1>
      <Link href="/">
        <a className="link">ブログトップへ</a>
      </Link>
      <div className="item">
        <h2 className="item__title">{props.blog.title}</h2>
        <p className="item__tag">タグ：</p>
        <p className="item__description">説明：</p>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY }
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
      props: { blog: data }
    }
  }

export default BlogDetail