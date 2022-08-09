import { useForm } from 'react-hook-form'
import Button from '../components/common/button'

type User = {
  name: string
  nickname: string
  profile: string
}

const CreateAccount = () => {
  const { register, handleSubmit } = useForm<User>()

  const submit = (data: User) => {
    console.log(data)
  }

  return (
    <>
      <h1>新規登録</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="name">名前</label>
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
          />
        </div>

        <div>
          <label htmlFor="nickname">ニックネーム</label>
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
          />
        </div>

        <div>
          <label htmlFor="profile">プロフィール</label>
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
          ></textarea>
        </div>

        <Button>アカウント作成</Button>
      </form>
    </>
  )
}

export default CreateAccount
