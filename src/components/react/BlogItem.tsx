import type { Post } from "@/lib/sanity";
import dayjs from "dayjs";

const BlogItem = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="not-prose">
      {posts.map((post) => (
        <li key={post._id}>
          <a href={`/blog/${post.slug}`}>
            <div className="py-3 px-3 -ml-3 rounded-md hover:bg-muted transition-all duration-300 ease-in-out">
              <h3 className="text-primary">{post.name}</h3>
              <time>{dayjs(post._createdAt).format("DD/MM/YYYY")}</time>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export { BlogItem };
