import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const links = [
    { label: '検索', path: '/seach-post' },
    { label: '投稿', path: '/create-post' },
    { label: '設定', path: '/' }
  ]

  return (
    <footer className="py-4 bg-blue-400 mt-10">
      <div className="container">
        <div className="mb-4">
          <a className="flex">
            <Image src="/logo.svg" width={160} height={32} alt="logo" />
          </a>
        </div>
        <h2 className="mb-2">メニュー</h2>
        <ul className="lg:flex lg:space-x-2 lg:space-y-0 space-y-2 mb-2">
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link href={link.path}>
                  <a className="hover:text-gray-50">{link.label}</a>
                </Link>
              </li>
            )
          })}
        </ul>
        <div>
          <p>© copy</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
