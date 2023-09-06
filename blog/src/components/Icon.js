import tw, { styled } from 'twin.macro'

const Icon = styled.i(({ active }) => [
  tw`
    text-gray-400 p-2 rounded-full cursor-pointer
    bg-transparent hover:bg-gray-100
    dark:text-gray-400 dark:hover:bg-gray-700
    transition-colors duration-300
  `,
  active && tw`text-gray-900 dark:text-gray-100`,
])

export default Icon
