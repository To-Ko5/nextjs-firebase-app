import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../context/auth'
import UserMenu from '../user/user-menu'
import Button from './button'

const Header = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  return (
    <header className="py-4 bg-blue-400 mb-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex">
              <Image src="/logo.svg" width={160} height={32} alt="logo" />
            </a>
          </Link>

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
  )
}

export default Header
