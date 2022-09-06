import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

const menuLinks = [
  { lable: 'menu', href: '/' },
  { lable: '検索', href: '/search-post' },
  { lable: '作成', href: '/create-post' },
  { lable: 'お問い合わせ', href: '/contact' }
]

const Sidebar = ({
  isOpen,
  closeModal
}: {
  isOpen: boolean
  closeModal: () => void
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0" onClose={closeModal}>
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

          <div className="fixed inset-y-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 -translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-full"
              >
                <Dialog.Panel className="w-80 fixed left-0 inset-y-0 bg-gray-50">
                  <div className="px-2 py-4">
                    <Link href="/">
                      <a className="flex">
                        <Image
                          src="/logo.svg"
                          width={160}
                          height={32}
                          alt="logo"
                        />
                      </a>
                    </Link>
                  </div>
                  <ul>
                    <li>
                      {menuLinks.map((menu, index) => {
                        return (
                          <Link href={menu.href} key={index}>
                            <a className="block px-2 py-4 border-b border-blue-400 hover:text-blue-400">
                              {menu.lable}
                            </a>
                          </Link>
                        )
                      })}
                    </li>
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Sidebar
