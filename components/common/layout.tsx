import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="py-4 bg-blue-400"></header>
      <main>{children}</main>

      <footer className="py-4 bg-blue-400"></footer>
    </>
  )
}

export default Layout
