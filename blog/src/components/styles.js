import tw, { css } from "twin.macro"

const globalStyles = css`
  body {
    ${tw`
      text-gray-900
      dark:bg-gray-800 dark:text-gray-100
      transition-all duration-200
    `}
  }
`

export default globalStyles
