import { MenuIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../../context/auth'
import UserMenu from '../user/user-menu'
import Sidebar from './sidebar'

const Header = () => {
  const { user, isLoading } = useAuth()
  const [isSideber, setIsSidebarOpen] = useState<boolean>(true)

  const closeModal = () => {
    setIsSidebarOpen(false)
  }

  const openModal = () => {
    setIsSidebarOpen(true)
  }

  if (isLoading) {
    return null
  }

  return (
    <>
      <header className="py-4 bg-blue-400 mb-10">
        <div className="container">
          <div className="flex items-center justify-between">
            <button className="p-2 mr-2" onClick={openModal}>
              <MenuIcon className="w-5 h-5"></MenuIcon>
            </button>
            <Link href="/">
              <a className="flex">
                <Image src="/logo.svg" width={160} height={32} alt="logo" />
              </a>
            </Link>
            <div className="flex-1"></div>
            {user ? (
              <UserMenu />
            ) : (
              <Link href="/login">
                <a>ログイン</a>
              </Link>
            )}
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSideber} closeModal={closeModal} />
    </>
  )
}

export default Header
