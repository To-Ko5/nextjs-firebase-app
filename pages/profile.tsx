import { ReactElement } from 'react'
import Layout from '../components/common/layout'
import UserForm from '../components/form/user-form'
import { NextPageWithLayout } from './_app'

const Profile: NextPageWithLayout = () => {
  return (
    <div className="container">
      <UserForm isEditMode={true} />
    </div>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Profile
