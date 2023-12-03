import Image from 'next/image';
import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { MDXComponents } from 'mdx/types';

const MyH1 = (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
        className="text-black text-3xl md:text-4xl lg:text-5xl my-4 text-center max-w-full"
        {...props}
    />
);
const MyH2 = (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2
        className="text-black text-xl font-bold md:text-2xl lg:text-3xl mt-16 mb-4 p-4 text-center w-full bg-slate-100 rounded"
        {...props}
    />
);
const MyH3 = (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-black text-xl mt-2 mb-4 font-bold" {...props} />
);
const Myp = (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-slate-600 text-base" {...props} />
);
const MyUl = (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="text-black text-base list-disc px-8" {...props} />
);
const MyLi = (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="text-slate-600 text-base" {...props} />
);
const MyStrong = (props: React.HTMLProps<HTMLSpanElement>) => (
    <span className="text-black font-semibold text-lg" {...props} />
);
const MyImg = (props: React.HTMLProps<HTMLImageElement>) => (
    <img className="mx-auto mb-4 rounded-xl w-full lg:w-10/12" {...props} />
);
const MyA = (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a className="text-black text-base" {...props} />
);
const MyBlockquote = (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote
        className="text-slate-900 px-8 py-10 md:py-16 m-auto text-lg md:text-xl lg:text-2xl font-bold text-justify w-full mb-[-40px] bg-slate-100 rounded shadow"
        {...props}
    />
);

const mdxComponents: MDXComponents = {
    h1: MyH1,
    h2: MyH2,
    h3: MyH3,
    p: Myp,
    ul: MyUl,
    li: MyLi,
    strong: MyStrong,
    img: MyImg,
    a: MyA,
    blockquote: MyBlockquote,
};

export const generateStaticParams = async () =>
    allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
    return { title: post?.title || "" };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
    const MDXContent = useMDXComponent(post?.body.code || "");

    return (
        <main>
            <div className='mt-16 w-full h-[300px] md:h-[400px] lg:h-[500px] relative'>
                <Image
                    src={post?.hero_image || ''}
                    alt={''}
                    fill={true}
                    className='object-cover'
                />
            </div>
            <article className="w-screen max-w-[1024px] m-auto p-4">
                <MDXContent components={mdxComponents} />
            </article>
        </main>
    );
};

export default PostLayout;
