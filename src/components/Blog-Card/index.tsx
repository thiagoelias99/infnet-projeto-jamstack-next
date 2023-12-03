import NextLink from 'next/link'
import React from 'react'

interface IBlogCard {
    title: string
    hero: any
    slug: string
    excerpt: string
    date: string
}

const BlogCard = ({ title, hero, date, excerpt, slug }: IBlogCard) => {
    return (
        <NextLink href={`/blog/${slug}`}>
            <div className='flex flex-row justify-center items-center gap-4 h-44 md:h-32 p-2 hover:bg-slate-100 rounded'>
                <div className='relative h-full w-36'>
                    {hero}
                </div>
                <div className='flex flex-col justify-start items-start h-full flex-1'>
                    <p className='text-xs md:text-sm text-slate-700 italic '>{date}</p>
                    <h3 className='text-base md:text-xl font-semibold'>{title}</h3>
                    <p className='text-sm md:text-base mt-2 flex-1 text-slate-800'>{excerpt}</p>
                </div>
            </div>
        </NextLink>
    )
}

export default BlogCard