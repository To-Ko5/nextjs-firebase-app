import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button
      className="px-4 py-2 rounded-full bg-blue-500 text-gray-50 disabled:opacity-10"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
