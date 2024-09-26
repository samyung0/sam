import { PortableText, defaultComponents } from "@portabletext/react";
import ReactPlayer from "react-player/lazy";
import type { Post } from "@/lib/sanity";
import * as shiki from "shiki";

const highlighter = await shiki.createHighlighter({
  langs: Object.keys(shiki.bundledLanguages),
  themes: ["catppuccin-mocha"],
});

const ReactPortabletext = ({ post }: { post: Post }) => (
  <PortableText
    value={post.content}
    components={{
      list: {
        indent: (props) => {
          return <ul className="list-none">{props.children}</ul>;
        },
      },
      block: (props) => {
        const HeadingTag = props.value.style! as any;

        if (/^h\d/.test(HeadingTag)) {
          return (
            <HeadingTag id={props.value.children[0].text}>
              {props.children}
            </HeadingTag>
          );
        }
        return (defaultComponents.block as any)[HeadingTag](props);
      },
      types: {
        inlineImage: (props) => {
          return (
            <a
              aria-label="Open Image"
              target="_blank"
              href={props.value.asset.url}
            >
              <img
                style={{
                  backgroundImage: `url(${props.value.asset.metadata.lqip})`,
                  backgroundSize: "50%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                decoding="async"
                loading="lazy"
                className="max-h-[200px] max-w-[200px] object-contain float-left m-4 block"
                src={props.value.asset.url}
                alt=""
                width={props.value.asset.metadata.dimensions.width}
                height={props.value.asset.metadata.dimensions.height}
              />
            </a>
          );
        },
        image: (props) => {
          return (
            <figure className="flex justify-center flex-col items-center">
              <a
                aria-label="Open Image"
                target="_blank"
                href={props.value.asset.url}
              >
                <img
                  style={{
                    backgroundImage: `url(${props.value.asset.metadata.lqip})`,
                    backgroundSize: "50%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                  decoding="async"
                  loading="lazy"
                  className="max-h-[400px] object-contain"
                  src={props.value.asset.url}
                  alt=""
                  width={props.value.asset.metadata.dimensions.width}
                  height={props.value.asset.metadata.dimensions.height}
                />
              </a>
              {props.value.caption && (
                <figcaption>{props.value.caption}</figcaption>
              )}
            </figure>
          );
        },
        code: (props) => {
          const html = highlighter.codeToHtml(props.value.code, {
            lang: props.value.language ?? "javascript",
            theme: "catppuccin-mocha",
          });
          return <div dangerouslySetInnerHTML={{ __html: html }} />;
        },
        embed: (props) => {
          const url = props.value.url;
          return <ReactPlayer url={url} controls />;
        },
        sizeChart: (props) => {
          return (
            <table>
              {props.value.rows.map((row: any, index: number) => (
                <tr key={row._key}>
                  {row.cells.map((cell: any) =>
                    index === 0 ? (
                      <th key={row._key + index}>{cell}</th>
                    ) : (
                      <td key={row._key + index}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </table>
          );
        },
      },
      marks: {
        indent2: (props) => {
          return (
            <span
              style={{
                paddingInlineStart: props.value.indentLevel * 32 + "px",
              }}
            >
              {props.children}
            </span>
          );
        },
        highlight: (props) => {
          return (
            <span
              style={{
                display: "inline-block",
                textDecoration: "underline",
                textDecorationColor: "tomato",
                textDecorationThickness: "2px",
                textUnderlineOffset: "2px",
                // backgroundColor: "tomato",
                // color: "whitesmoke",
                margin: "0 4px",
              }}
            >
              {props.children}
            </span>
          );
        },
        code: (props) => {
          return <code className="inlineCode">{props.children}</code>;
        },
        internalLink: (props) => {
          if (props.value.type === "author" && props.value.slug === "sam-yung")
            return <a href="/about">{props.children}</a>;
          return (
            <a href={`/${props.value.type}/${props.value.slug}`}>
              {props.children}
            </a>
          );
        },
        link: (props) => {
          const { blank, href } = props.value;
          return blank ? (
            <a href={href} target="_blank" rel="noopener">
              {props.children}
            </a>
          ) : (
            <a href={href}>{props.children}</a>
          );
        },
      },
    }}
  />
);

export { ReactPortabletext };
