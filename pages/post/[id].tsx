import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr/immutable'
import { db } from '../../firebase/client'
import { Post } from '../../types/post'
import { User } from '../../types/user'

const PostDetail = () => {
  const router = useRouter()
  const [post, setPost] = useState<Post>()
  const postId = router.query.id

  const { data: user } = useSWR<User>(
    post?.authorId && `users/${post.authorId}`,
    async () => {
      const ref = doc(db, `users/${post?.authorId}`)
      const response = await getDoc(ref)
      return response.data() as User
    }
  )
  useEffect(() => {
    const ref = doc(db, `posts/${postId}`)
    getDoc(ref).then((snap) => {
      setPost(snap.data() as Post)
    })
  }, [postId])

  if (!post) {
    return null
  }

  return (
    <>
      <div className="container">
        <h1 className="font-bold text-lg">{post.title}</h1>

        <div className="flex">{user && <p>{user.name}</p>}</div>

        <p className="">{post.body}</p>
      </div>
    </>
  )
}

export default PostDetail
