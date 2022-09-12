import classNames from 'classnames'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/common/button'
import { useAuth } from '../../context/auth'
import { db, storage } from '../../firebase/client'
import { User } from '../../types/user'
import ImageSelecter from '../user/image-selecter'

const UserForm = ({ isEditMode }: { isEditMode?: boolean }) => {
  const { firebaseUser, isLoading, user } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors }
  } = useForm<User>()

  useEffect(() => {
    if (isEditMode && user) {
      reset(user)
    }
  }, [isEditMode, reset, user])

  const submit = async (data: User) => {
    if (!firebaseUser) {
      return
    }

    if (data.avatarURL?.match(/^data:/)) {
      const image = ref(storage, `users/${firebaseUser.uid}/avatar`)
      await uploadString(image, data.avatarURL, 'data_url')
      const avatarURL = await getDownloadURL(image)
      data.avatarURL = avatarURL
    }

    const documentRef = doc(db, `users/${firebaseUser.uid}`)
    setDoc(documentRef, data).then(() => {
      if (isEditMode) {
        alert('編集しました')
      } else {
        alert('作成しました')
        router.push('/')
      }
    })
  }

  if (isLoading) {
    return null
  }

  if (!firebaseUser && !isLoading) {
    router.push('/login')
    return null
  }

  if (user && !isLoading && !isEditMode) {
    router.push('/')
  }

  return (
    <div className="container">
      <h1 className="mb-4 text-xl">
        {isEditMode ? 'プロフィール編集' : '新規登録'}
      </h1>

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <ImageSelecter control={control} name="avatarURL" />
        <div>
          <label className="block mb-1" htmlFor="name">
            名前＊
          </label>
          <input
            {...register('name', {
              required: '必須入力',
              maxLength: {
                value: 50,
                message: '最大50文字です'
              }
            })}
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            className={classNames(
              'rounded border',
              errors.name ? 'border-red-500' : 'border-slate-400'
            )}
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1" htmlFor="nickname">
            ニックネーム＊
          </label>
          <input
            {...register('nickname', {
              required: '必須入力',
              maxLength: {
                value: 50,
                message: '最大50文字です'
              }
            })}
            type="text"
            name="nickname"
            id="nickname"
            autoComplete="off"
            className={classNames(
              'rounded border',
              errors.name ? 'border-red-500' : 'border-slate-400'
            )}
          />
          {errors.nickname && (
            <p className="text-red-500 mt-1">{errors.nickname?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1" htmlFor="profile">
            プロフィール＊
          </label>
          <textarea
            {...register('profile', {
              required: '必須入力',
              maxLength: {
                value: 250,
                message: '最大250文字です'
              }
            })}
            name="profile"
            id="profile"
            cols={30}
            rows={10}
            className={classNames(
              'rounded border',
              errors.name ? 'border-red-500' : 'border-slate-400'
            )}
          ></textarea>
          <p className="text-sm text-slate-400 leading-none">
            {watch('profile')?.length || 0} / 250
          </p>
          {errors.profile && (
            <p className="text-red-500 mt-1">{errors.profile?.message}</p>
          )}
        </div>

        <Button>{isEditMode ? '編集する' : 'アカウント作成'}</Button>
      </form>
    </div>
  )
}

export default UserForm
