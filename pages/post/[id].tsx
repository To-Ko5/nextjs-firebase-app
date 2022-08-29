import { format } from 'date-fns'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import Layout from '../../components/common/layout'
import { useAuth } from '../../context/auth'
import { adiminDB } from '../../firebase/server'
import { useUser } from '../../hooks/user'
import { Post } from '../../types/post'
import { NextPageWithLayout } from '../_app'

const PostDetail: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
  const user = useUser(post?.authorId)
  const { firebaseUser } = useAuth()
  const isAuthor = firebaseUser?.uid === post?.authorId
  if (!post) {
    return <p>記事がありません。</p>
  }

  return (
    <>
      <div className="container">
        <div className="grid">
          <h1 className="font-bold text-lg mb-4 row-start-2">{post.title}</h1>
          <div className="bg-gray-300 mb-4 aspect-video row-start-1"></div>
        </div>

        <div className="flex mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
          <div className="">
            {user && <p>{user.name}</p>}
            <p>{format(post.createdAt, 'yyyy年MM月dd日')}</p>
          </div>
        </div>

        <p className="">{post.body}</p>

        {isAuthor && (
          <div>
            <Link href={`/post/${post.id}/edit`}>
              <a className="text-slate-500">削除</a>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({
  params
}) => {
  const response = await adiminDB.doc(`posts/${params?.id}`).get()
  const post = response.data() as Post
  if (!post) {
    return {
      notFound: true
    }
  }
  return {
    props: { post }
  }
}

PostDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default PostDetail
