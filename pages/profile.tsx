import { ReactElement } from 'react'
import Layout from '../components/common/layout'
import { NextPageWithLayout } from './_app'

const Profile: NextPageWithLayout = () => {
  return (
    <div className="container">
      <h1 className="mb-4 text-xl">プロフィール</h1>
    </div>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Profile
