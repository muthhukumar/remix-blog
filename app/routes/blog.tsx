import { json, Link, LoaderFunction, MetaFunction, useLoaderData, useSearchParams } from 'remix'
import { BiRightArrowAlt } from 'react-icons/bi'
import { IoIosSearch } from 'react-icons/io'

import Container from '~/components/container'
import Date from '~/components/date'
import * as post from '~/utils/md.server'
import { Post } from '~/utils/md.server'

function BlogPost({ title, publishedAt, description, id }: Pick<Post, 'title' | 'publishedAt' | 'description' | 'id'>) {
  return (
    <div className="w-full pb-10 mb-8 border-b">
      <Date className="my-2 text-sm text-gray-500" date={publishedAt} />
      <h2 className="my-4 text-2xl font-bold">{title}</h2>
      <p className="mb-4 text-md">{description}</p>
      <Link to={`/blog/${id}`} className="flex items-center text-sm text-blue-500">
        Read More <BiRightArrowAlt className="ml-1" />
      </Link>
    </div>
  )
}

export const meta: MetaFunction = () => {
  return {
    title: 'Articles and tutorials',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)

  const query = url.searchParams.get('q') ?? ''

  const blogPosts = await post.getPosts()

  const filteredBlogPosts = !query
    ? blogPosts
    : blogPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))

  return json({ blogPosts: filteredBlogPosts })
}

export default function Blog() {
  const { blogPosts } = useLoaderData<{ blogPosts: Array<Post> }>()
  const [searchParams] = useSearchParams()

  const q = searchParams.get('q')
  return (
    <>
      <div className="pb-6 border-b">
        <Container>
          <form>
            <h2 className="py-10 text-2xl font-bold">Blog</h2>
            <div className="flex items-center max-w-sm p-1 border border-gray-400 rounded-md">
              <IoIosSearch className="ml-2 text-gray-500" size={20} />
              <input
                name="q"
                type="text"
                className="w-full p-1 ml-2 text-sm"
                placeholder="Search posts..."
                defaultValue={q ?? ''}
              />
            </div>
          </form>
        </Container>
      </div>
      <Container>
        <div className="flex w-full">
          <div className="py-6">
            {blogPosts.length === 0 && <p className="text-center">No blog post found.</p>}
            <div className="w-full">
              {blogPosts.map((blogPost) => (
                <BlogPost
                  publishedAt={blogPost.publishedAt}
                  key={blogPost.id}
                  id={blogPost.id}
                  title={blogPost.title}
                  description={blogPost.description}
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
