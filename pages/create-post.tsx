import { ReactElement } from 'react'
import Layout from '../components/common/layout'
import PostForm from '../components/form/post-form'
import { NextPageWithLayout } from './_app'

const CreatePost: NextPageWithLayout = () => {
  return (
    <>
      <PostForm />
    </>
  )
}

CreatePost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default CreatePost
