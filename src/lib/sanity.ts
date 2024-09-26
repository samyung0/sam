import { sanityClient } from "sanity:client";
import { type ImageAsset, type PortableTextBlock } from "@sanity/types";

export const SANITY_PROD_URL =
  "https://ywfq98mg.api.sanity.io/v2022-03-07/data/query/production?query=";

export type Post = {
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  name: string;
  slug: string;
  tags: string[];
  relatedPosts: string[] | null;
  readingTime: number | null;
  thumbnail: {
    alt: string;
    asset: ImageAsset;
  };
  content: PortableTextBlock[];
  author: string;
  description: string;
};

export type Author = {
  _id: string;
  slug: string;
  bio: string;
  name: string;
  bioImage: {
    alt: string;
    asset: ImageAsset;
  };
};

export type Tag = {
  _id: string;
  slug: string;
  name: string;
};

export const getPosts = async () => {
  const posts = await sanityClient.fetch(
    `*[_type == "post"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    "slug": slug.current,
    thumbnail {
      alt,
      asset->,
    },
    content[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      },
      children[]{
        ...,
        _type == "inlineImage" => {
          ...,
          asset->
        }
      },
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug.current,
          "type": @.reference->_type
        }
      }
    },
    "tags": tags[]->slug.current,
    "author": author->slug.current,
    "relatedPosts": relatedPosts[]->slug.current,
    readingTime,
    description
  }`,
  );

  return posts as Post[];
};

export const getAuthors = async () => {
  const authors = await sanityClient.fetch(
    `
      *[_type == "author"] {
        _id,
        name,
        "slug": slug.current,
        bio,
        bioImage {
          alt,
          asset->
        }
      }
    `,
  );

  return authors as Author[];
};

export const getTags = async () => {
  const tags = await sanityClient.fetch(
    `
      *[_type == "tag"] {
        _id,
        name,
        "slug": slug.current
      }
    `,
  );

  return tags as Tag[];
};
