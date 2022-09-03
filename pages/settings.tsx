import { ReactElement } from 'react'
import Layout from '../components/common/layout'
import { NextPageWithLayout } from './_app'

const Settings: NextPageWithLayout = () => {
  return (
    <div className="container">
      <h1 className="mb-4 text-xl">設定</h1>
    </div>
  )
}

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Settings
