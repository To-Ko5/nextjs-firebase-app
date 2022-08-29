import React, { ReactElement } from 'react'
import Layout from '../../../components/common/layout'
import PostForm from '../../../components/form/post-form'
import { NextPageWithLayout } from '../../_app'

const PostEdit: NextPageWithLayout = () => {
  return (
    <div className="container">
      <PostForm isEditMode={true} />
    </div>
  )
}

PostEdit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default PostEdit
