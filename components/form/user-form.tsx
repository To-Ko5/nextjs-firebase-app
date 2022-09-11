import { PhotographIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import Button from '../../components/common/button'
import { useAuth } from '../../context/auth'
import { db } from '../../firebase/client'
import { User } from '../../types/user'

const UserForm = ({ isEditMode }: { isEditMode?: boolean }) => {
  const { firebaseUser, isLoading, user } = useAuth()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File>()
  const [scale, setScale] = useState<number>(1)
  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setSelectedImage(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDropAccepted,
    accept: { 'image/png': [], 'image/jpeg': [] }
  })

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

  const changeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value))
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
        <div>
          <p className="block mb-1">プロフィール画像</p>
          <div
            className={classNames(
              'aspect-square border-2 rounded-md border-dashed border-gray-500 w-40 grid content-center hover: cursor-pointer hover:bg-gray-50',
              isDragAccept && 'bg-blue-200'
            )}
            {...getRootProps()}
          >
            <div className="text-center ">
              <PhotographIcon className="mx-auto w-10 h-10 text-gray-200" />
              <p className="text-gray-200 text-sm">画像を選択</p>
            </div>
            <input type="hiden" {...getInputProps()} />
          </div>
          {selectedImage && (
            <div>
              <AvatarEditor
                image={selectedImage}
                width={250}
                height={250}
                borderRadius={125}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={0}
              />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                defaultValue={scale}
                onChange={changeRange}
              />
            </div>
          )}
        </div>

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
