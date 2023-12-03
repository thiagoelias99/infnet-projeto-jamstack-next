import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/pt-br';
import { allPosts } from 'contentlayer/generated';

import BlogCard from '@/components/Blog-Card';



const BlogPage = () => {
    const posts = allPosts
        .filter((post) => post.date)
        .sort((a, b) => moment(b.date).unix() - moment(a.date).unix())

    function formatDescription(description: string) {
        const start = description.indexOf('>') + 1
        return description.slice(start, start + 105) + '...'
    }

    function formatDate(date: string) {
        return moment(date).locale('pt-br').add(1, "day").format("MMMM DD, YYYY")
    }

    return (
        <main className='max-w-[1024px] m-auto mt-36 md:mt-24'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl text-center my-4'>Blog</h1>
            <h2 className='text-xl md:text-2xl lg:text-3xl p-4'>Veja nossos posts</h2>
            <nav className='flex flex-col justify-start items-start gap-4'>
                {posts.map(post => {
                    return (
                        <BlogCard
                            key={post.slug}
                            title={post.title}
                            date={formatDate(post.date)}
                            excerpt={formatDescription(post.body.raw)}
                            hero={<Image
                                src={post.hero_image}
                                alt={post.slug}
                                fill={true}
                                className='rounded-md'
                            />}
                            slug={post.slug}
                        />
                    )
                })
                }
            </nav>
        </main>
    )
}

export default BlogPage