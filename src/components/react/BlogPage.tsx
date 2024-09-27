import type { Post, Tag } from "@/lib/sanity";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { useState, useEffect } from "react";

const container = {
  hidden: {
    opacity: 0,
    x: -4,
    transition: {
      duration: 0.2,
      ease: cubicBezier(0.4, 0, 0.2, 1),
    },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.4, 0, 0.2, 1),
      staggerChildren: 0.1,
    },
  },
};

const BlogItem = ({ post }: { post: Post }) => {
  return (
    <a className="block" href={`/blog/${post.slug}`}>
      <div className="py-3 px-3 -ml-3 rounded-md hover:bg-muted transition-all duration-300 ease-in-out flex justify-between">
        <h2 className="text-secondary-foreground">{post.name}</h2>
        <time className="text-sm text-seconday">
          {dayjs(post._createdAt).format("DD/MM/YYYY")}
        </time>
      </div>
    </a>
  );
};

const BlogPage = ({ posts, tags }: { posts: Post[]; tags: Tag[] }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredPosts(posts);
      return;
    }
    setFilteredPosts(
      posts.filter((post) =>
        post.tags.some((tag) => selectedTags.includes(tag))
      )
    );
  }, [selectedTags, posts]);

  return (
    <>
      <ul className="not-prose flex flex-wrap gap-2 items-center">
        {tags.map((tag) => (
          <li key={tag._id}>
            <button
              onClick={() =>
                selectedTags.includes(tag.slug)
                  ? setSelectedTags(
                      selectedTags.filter((id) => id !== tag.slug)
                    )
                  : setSelectedTags([...selectedTags, tag.slug])
              }
            >
              <Badge
                variant="accent"
                className={cn(
                  "text-secondary-foreground border-border px-1",
                  selectedTags.includes(tag.slug) && "bg-border hover:bg-border"
                )}
              >
                {tag.name}
              </Badge>
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        <ul className="not-prose flex flex-col gap-1">
          {filteredPosts.map((post) => (
            <motion.li
              variants={container}
              key={post._id}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <BlogItem post={post} />
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </>
  );
};

export { BlogPage };
