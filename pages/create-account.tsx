import classNames from 'classnames'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Button from '../components/common/button'
import { useAuth } from '../context/auth'
import { db } from '../firebase/client'
import { User } from '../types/user'

const CreateAccount = () => {
  const { firebaseUser, isLoading, user } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<User>()

  const submit = (data: User) => {
    if (!firebaseUser) {
      return
    }
    const ref = doc(db, `users/${firebaseUser.uid}`)
    setDoc(ref, data).then(() => {
      alert('作成')
      router.push('/')
    })
  }

  if (isLoading) {
    return null
  }

  if (!firebaseUser && !isLoading) {
    router.push('/login')
    return null
  }

  if (user && !isLoading) {
    router.push('/')
  }

  return (
    <div className="container">
      <h1 className="mb-4 text-xl">新規登録</h1>

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
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

        <Button>アカウント作成</Button>
      </form>
    </div>
  )
}

export default CreateAccount
