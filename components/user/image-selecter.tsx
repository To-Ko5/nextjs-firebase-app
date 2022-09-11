import { Dialog, Transition } from '@headlessui/react'
import { PhotographIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { ChangeEvent, Fragment, useCallback, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useDropzone } from 'react-dropzone'

const ImageSelecter = () => {
  const [selectedImage, setSelectedImage] = useState<File>()
  const [scale, setScale] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0])
    setIsModalOpen(true)
  }, [])

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDropAccepted,
    accept: { 'image/png': [], 'image/jpeg': [] }
  })

  const changeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value))
  }

  const closeModal = () => {
    setIsModalOpen(false)
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

      <Transition appear show={!!isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="px-4 py-2 rounded-full bg-gray-300"
                      onClick={closeModal}
                    >
                      閉じる
                    </button>
                    <button className="px-4 py-2 rounded-full bg-blue-400 text-gray-50">
                      保存
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ImageSelecter
