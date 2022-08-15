import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/common/button'
import { Post } from '../types/post'

const CreatePost = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<Post>()

  const submit = (data: Post) => {
    console.log(data)
  }
  return (
    <>
      <h1>記事を投稿する</h1>

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
            プロフィール＊
          </label>
          <textarea
            {...register('body', {
              required: '必須入力',
              maxLength: {
                value: 250,
                message: '最大250文字です'
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

        <Button>投稿する</Button>
      </form>
    </>
  )
}

export default CreatePost
