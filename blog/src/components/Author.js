import React from 'react'
import 'twin.macro'

export default function Author ({ bio, avatar, slug }) {
  return (
    <a href={slug || '#'}>
      <div tw="flex items-center">
        <div tw="flex-shrink-0">
          <img
            tw="inline-block h-9 w-9 rounded-full"
            src={avatar}
            alt=""
          />
        </div>
        <div tw="ml-5">
          <p
            tw="text-sm font-sans text-gray-700 dark:text-gray-500"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </div>
      </div>
    </a>
  )
}
