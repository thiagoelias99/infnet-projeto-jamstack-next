import moment from 'moment';
import 'moment/locale/pt-br';
import { allPosts } from 'contentlayer/generated';

import Image from 'next/image'

import HomeCover from '../images/home-cover.png'
import Card from '@/components/Card';

export default function Home() {
  const posts = allPosts
    .filter((post) => post.date)
    .sort((a, b) => moment(b.date).unix() - moment(a.date).unix())
    .slice(0, 6)

  function formatDescription(description: string) {
    const start = description.indexOf('>') + 1
    return description.slice(start, start + 105) + '...'
  }

  function formatDate(date: string) {
    return moment(date).locale('pt-br').add(1, "day").format("MMMM DD, YYYY")
  }

  return (
    <main>
      <figure className='flex max-h-[900px] relative mt-32 md:mt-24'>
        <div className='w-full absolute top-[40%] text-center z-20'>
          <p className='text-2xl md:text-5xl text-white uppercase'>inspirações para viajar</p>
        </div>
        <div className='absolute w-full h-full bg-black/25 z-10'></div>
        <Image
          src={HomeCover}
          alt='mountains'
          className='max-h-[900px] z-0 bg-cover w-full'
        />
      </figure>

      <section className='p-4 max-w-[1024px] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-y-10'>
        <h2 className='col-span-1 md:col-span-2 lg:col-span-3 text-3xl md:text-4xl lg:text-5xl text-center mt-4'>Últimos Posts</h2>

        {posts.map(post => {
          return (
            <Card
              key={post.slug}
              title={post.title}
              date={formatDate(post.date)}
              description={formatDescription(post.body.raw)}
              cover={<Image
                src={post.hero_image}
                alt={post.slug}
                fill={true}
                className='rounded-t-lg'
              />}
              slug={post.slug}
            />
          )
        })}

      </section>
    </main>
  )
}
