import { format } from 'date-fns'
import { doc, getDoc } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/client'
import { adiminDB } from '../../firebase/server'
import { useUser } from '../../hooks/user'
import { Post } from '../../types/post'

const PostDetail = ({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const user = useUser(post?.authorId)

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

export default PostDetail
