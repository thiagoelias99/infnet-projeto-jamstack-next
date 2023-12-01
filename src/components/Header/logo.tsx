import React from 'react'
import NextLink from 'next/link'
import Image from 'next/image'

import logo1 from '../../images/logo1.svg'
import logo2 from '../../images/logo2.svg'

export default function Logo() {
  return (
    <NextLink href='/'>
      <div className='flex flex-row max-h-12'>
        <Image
          src={logo1}
          alt='logo'
          placeholder='empty'
        />
        <Image
          src={logo2}
          alt='logo'
          placeholder='empty'
        />
      </div>
    </NextLink>
  )
}
