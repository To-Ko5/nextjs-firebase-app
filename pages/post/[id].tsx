import { format } from 'date-fns'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/client'
import { useUser } from '../../hooks/user'
import { Post } from '../../types/post'

const PostDetail = () => {
  const router = useRouter()
  const [post, setPost] = useState<Post>()
  const postId = router.query.id
  const user = useUser(post?.authorId)

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

        <div className="flex">
          <div className=""></div>
          <div className="flex-1">
            {user && <p>{user.name}</p>}
            <p>{format(post.createdAt, 'yyyy年MM月dd日')}</p>
          </div>
        </div>

        <p className="">{post.body}</p>
      </div>
    </>
  )
}

export default PostDetail
