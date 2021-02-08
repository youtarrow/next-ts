import Link from 'next/link'
import Layout from 'components/Layout'
import Header from 'components/Header'
import Nav from 'components/Nav'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Header></Header>
    <Nav></Nav>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
