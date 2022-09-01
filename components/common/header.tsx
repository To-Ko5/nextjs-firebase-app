import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UserMenu from '../user/user-menu'

const Header = () => {
  return (
    <header className="py-4 bg-blue-400 mb-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex">
              <Image src="/logo.svg" width={160} height={32} alt="logo" />
            </a>
          </Link>

          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
