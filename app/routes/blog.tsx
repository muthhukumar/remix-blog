import { json, Link, LoaderFunction, MetaFunction, useLoaderData, useSearchParams } from 'remix'
import { BiRightArrowAlt } from 'react-icons/bi'
import { IoIosSearch } from 'react-icons/io'

import Container from '~/components/container'
import Date from '~/components/date'

import { getPosts, Post } from '~/utils/cms.server'

function BlogPost({
  title,
  publishedAt,
  excerpt,
  slug,
}: Pick<Post, 'title' | 'publishedAt' | 'excerpt' | 'slug'>) {
  return (
    <div className="w-full pb-6 mb-4 border-b border-color md:pb-10 md:mb-8">
      <Date className="my-2 text-sm light-font-color md:text-base" date={publishedAt} />
      <h2 className="my-4 text-xl font-bold md:text-2xl">{title}</h2>
      <p className="mb-4 text-sm md:text-base">{excerpt}</p>
      <Link
        to={`/blog/${slug}`}
        className="flex items-center text-sm link-font-color"
        prefetch="render"
      >
        Read More <BiRightArrowAlt className="ml-1" />
      </Link>
    </div>
  )
}

export const meta: MetaFunction = () => {
  return {
    title: 'Blog | Muthukumar',
  }
}

export const loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url)

  const query = url.searchParams.get('q') ?? ''

  const blogPosts = await getPosts(context)

  const filteredBlogPosts = !query
    ? blogPosts
    : blogPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))

  return json(
    { blogPosts: filteredBlogPosts },
    {
      headers: {
        'Cache-Control': 'max-age=100, must-revalidate',
      },
    },
  )
}

export default function Blog() {
  const { blogPosts } = useLoaderData<{ blogPosts: Array<Post> }>()
  const [searchParams] = useSearchParams()

  const q = searchParams.get('q')
  return (
    <>
      <div className="pb-6 border-b border-color">
        <Container>
          <form>
            <h2 className="py-4 text-xl font-bold md:py-10 md:text-2xl">Blog</h2>
            <div className="flex items-center max-w-sm p-1 border rounded-md border-color">
              <IoIosSearch className="ml-2 text-gray-600" size={20} />
              <input
                name="q"
                type="text"
                className="w-full p-1 ml-2 text-sm bg-color"
                placeholder="Search posts..."
                defaultValue={q ?? ''}
              />
            </div>
          </form>
        </Container>
      </div>
      <Container>
        <div className="w-full">
          <div className="py-2 md:py-6">
            {blogPosts.length === 0 && <p className="text-center">No blog post found.</p>}
            <div className="w-full">
              {blogPosts.map((blogPost) => (
                <BlogPost
                  publishedAt={blogPost.publishedAt}
                  key={blogPost.id}
                  slug={blogPost.slug}
                  title={blogPost.title}
                  excerpt={blogPost.excerpt}
                />
              ))}
            </div>
          </div>
          {/* TODO: For the future */}
          {/* <div className="w-full max-w-[20rem] bg-gray-300">
            <h2>Recommended posts</h2>
          </div> */}
        </div>
      </Container>
    </>
  )
}
