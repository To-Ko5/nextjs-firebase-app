import { useForm } from 'react-hook-form'
import Button from '../components/common/button'

type User = {
  name: string
  nickname: string
  profile: string
}

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>()

  const submit = (data: User) => {
    console.log(data)
  }

  return (
    <div className="container">
      <h1 className="mb-4 text-xl">新規登録</h1>

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <label className="block mb-1" htmlFor="name">
            名前
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
            className="rounded border border-slate-400"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1" htmlFor="nickname">
            ニックネーム
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
            className="rounded border border-slate-400"
          />
          {errors.nickname && (
            <p className="text-red-500 mt-1">{errors.nickname?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1" htmlFor="profile">
            プロフィール
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
            className="rounded border border-slate-400"
          ></textarea>
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
