import { PhotographIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { ChangeEvent, useCallback, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useDropzone } from 'react-dropzone'

const ImageSelecter = () => {
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

  const changeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value))
  }
  return (
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
  )
}

export default ImageSelecter
