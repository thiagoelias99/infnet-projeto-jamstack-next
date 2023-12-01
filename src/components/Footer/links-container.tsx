import React from 'react'
import Image from 'next/image'

import GithubIcon from '../../images/icons/github.svg'
import LinkedinIcon from '../../images/icons/linkedin.svg'
import MailIcon from '../../images/icons/mail.svg'

interface LinkProps {
  link: string
  icon: any
}

const CustomLink = ({ link, icon }: LinkProps) => {
  return (
    <li className='text-white'>
      <a href={link} target='blank'>
        {icon}
      </a>
    </li>
  )
}

export default function LinksContainer() {
  return (
    <nav className='w-full md:w-1/3 order-2 md:order-3'>
      <ul className='list-none flex flex-row gap-4 justify-center md:justify-end items-center'>
        <CustomLink
          link='https://github.com/thiagoelias99/infnet-projeto-jamstack-next'
          icon={
            <Image src={GithubIcon}
              alt={'github icon'}
              className='fill-white stroke-white text-white h-[24px] w-[24px]'
            />}
        />
        <CustomLink
          link='https://www.linkedin.com/in/eng-thiagoelias/'
          icon={
            <Image src={LinkedinIcon}
              alt={'linked icon'}
              className='fill-white stroke-white text-white h-[24px] w-[24px]'
            />}
        />
        <CustomLink
          link='mailto:thiagoelias99@gmail.com'
          icon={
            <Image src={MailIcon}
              alt={'email icon'}
              className='fill-white stroke-white text-white h-[24px] w-[24px]'
            />}
        />
      </ul>
    </nav>
  )
}
