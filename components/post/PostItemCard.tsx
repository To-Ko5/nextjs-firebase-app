import { format } from 'date-fns'
import Link from 'next/link'
import { useUser } from '../../hooks/user'
import { Post } from '../../types/post'

const PostItemCard = ({ post }: { post: Post }) => {
  const user = useUser(post.authorId)

  return (
    <div className="rounded-sm shadow p-4">
      <p className="line-clamp-2">
        <Link href={`/post/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </p>
      <div className="flex items-center">
        {user && (
          /* eslint-disable @next/next/no-img-element */
          <div className="w-8 h-8 rounded-full overflow-hidden mr-4">
            <img
              src={user.avatarURL}
              alt={user.nickname}
              className="w-full h-full"
            />
          </div>
        )}
        <div>
          <p className="text-slate-500 text-sm">
            {format(post.createdAt, 'yyyy年MM月dd日')}
          </p>
          {user ? <p className="truncate">{user.name}</p> : <p>...</p>}
        </div>
      </div>
    </div>
  )
}

export default PostItemCard
