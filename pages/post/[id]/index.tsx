import React, { ReactElement } from 'react'
import Layout from '../../../components/common/layout'
import { NextPageWithLayout } from '../../_app'

const PostEdit: NextPageWithLayout = () => {
  return <></>
}

PostEdit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default PostEdit
