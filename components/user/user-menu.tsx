import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { forwardRef, ReactNode } from 'react'
import { logout } from '../../lib/auth'

const UserMenu = () => {
  const items = [
    { label: 'プロフィール', href: '/profile' },
    {
      label: '設定',
      href: '/settings'
    }
  ]

  const MyLink = forwardRef<
    HTMLAnchorElement,
    { href: string; className: string; children: ReactNode }
  >((props, ref) => {
    let { href, className, children, ...rest } = props
    return (
      <Link href={href}>
        <a ref={ref} {...rest} className={className}>
          {children}
        </a>
      </Link>
    )
  })

  MyLink.displayName = 'MyLink'

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="block bg-gray-500 rounded-full w-8 h-8"></Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {items.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <MyLink
                      href={item.href}
                      className={`${
                        active ? 'bg-blue-400 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item.label}
                    </MyLink>
                  )}
                </Menu.Item>
              )
            })}
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => {
                  return (
                    <button
                      className={`${
                        active ? 'bg-blue-400 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={logout}
                    >
                      ログアウト
                    </button>
                  )
                }}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserMenu
