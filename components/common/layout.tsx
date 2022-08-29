import Image from 'next/image'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="py-4 bg-blue-400">
        <div className="container">
          <Image src="/logo.svg" width={160} height={32} alt="logo" />
        </div>
      </header>
      <main>{children}</main>

      <footer className="py-4 bg-blue-400"></footer>
    </>
  )
}

export default Layout
