import Button from '../components/common/button'

const createAccount = () => {
  return (
    <>
      <h1>新規登録</h1>

      <div>
        <label htmlFor="name">名前</label>
        <input type="text" name="name" id="name" />
      </div>

      <div>
        <label htmlFor="nickname">ニックネーム</label>
        <input type="text" name="nickname" id="nickname" />
      </div>

      <div>
        <label htmlFor="profile">プロフィール</label>
        <textarea name="profile" id="profile" cols={30} rows={10}></textarea>
      </div>

      <Button>アカウント作成</Button>
    </>
  )
}

export default createAccount
