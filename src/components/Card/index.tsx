import React from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import { IPost } from '@/models/Post'

export default function Card({ cover, date, description, title, slug }: IPost) {
    return (
        <div className='h-[400px] md:h-[420px] lg:h-[460px] flex flex-col hover:bg-slate-100 p-4 rounded'>
            <div className='w-full h-[209px] relative'>
                {cover}
            </div>
            <h3 className='text-2xl lg:text-3xl mt-2 text-ellipsis'>{title}</h3>
            <p className='text-xs w-full text-right mt-2 text-slate-700 italic'>{date}</p>
            <p className='flex-1 text-sm h-32 w-full text-ellipsis overflow-hidden text-slate-800'>{description}</p>
            <NextLink href={`/blog/${slug}`} className='text-base font-bold underline mt-2'>Ver Post</NextLink>
        </div>
    )
}
