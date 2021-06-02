import React from 'react'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      src="https://kit.fontawesome.com/ee41433cc7.js"
      crossOrigin="anonymous"
    />,
  ])
}
