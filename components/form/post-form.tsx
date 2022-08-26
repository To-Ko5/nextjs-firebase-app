import classNames from 'classnames'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/common/button'
import { useAuth } from '../../context/auth'
import { db } from '../../firebase/client'
import { Post } from '../../types/post'

const PostForm = ({ isEditMode }: { isEditMode?: boolean }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Post>()
  const router = useRouter()
  const { firebaseUser, isLoading } = useAuth()
  const editModeId = router.query.id as string

  useEffect(() => {
    if (editModeId) {
      const ref = doc(db, `posts/${editModeId}`)
      getDoc(ref).then((snap) => {
        const post = snap.data() as Post
        reset(post)
      })
    }
  }, [editModeId])

  if (!firebaseUser) {
    if (!isLoading) {
      router.push('/login')
    }
    return null
  }

  const submit = (data: Post) => {
    const ref = isEditMode
      ? doc(db, `posts/${editModeId}`)
      : doc(collection(db, 'posts'))
    const post: Post = {
      id: isEditMode ? editModeId : ref.id,
      title: data.title,
      body: data.body,
      createdAt: isEditMode ? data.createdAt : Date.now(),
      updatedAt: isEditMode ? Date.now() : null,
      authorId: firebaseUser?.uid
    }
    setDoc(ref, post, { merge: true }).then(() => {
      alert(`${isEditMode ? '編集' : '作成'}完了`)
    })
  }
  return (
    <>
      <h1>{isEditMode ? '記事を編集' : '記事を投稿する'} </h1>

      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label className="block mb-1" htmlFor="name">
            タイトル＊
          </label>
          <input
            {...register('title', {
              required: '必須入力',
              maxLength: {
                value: 50,
                message: '最大50文字です'
              }
            })}
            type="text"
            name="title"
            id="title"
            autoComplete="off"
            className={classNames(
              'rounded border',
              errors.title ? 'border-red-500' : 'border-slate-400'
            )}
          />
          {errors.title && (
            <p className="text-red-500 mt-1">{errors.title?.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-1" htmlFor="body">
            本文＊
          </label>
          <textarea
            {...register('body', {
              required: '必須入力',
              maxLength: {
                value: 500,
                message: '最大500文字です'
              }
            })}
            name="body"
            id="body"
            cols={30}
            rows={10}
            className={classNames(
              'rounded border',
              errors.body ? 'border-red-500' : 'border-slate-400'
            )}
          ></textarea>
          <p className="text-sm text-slate-400 leading-none">
            {watch('body')?.length || 0} / 250
          </p>
          {errors.body && (
            <p className="text-red-500 mt-1">{errors.body?.message}</p>
          )}
        </div>

        <Button>{isEditMode ? '編集する' : '投稿する'}</Button>
      </form>
    </>
  )
}

export default PostForm