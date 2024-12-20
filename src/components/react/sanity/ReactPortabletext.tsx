import { PortableText } from "@portabletext/react";
import type { Post } from "@/lib/sanity";
import type * as shikiType from "shiki";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { createJavaScriptRegexEngine, createHighlighter } from "shiki";

const ReactPortabletext = ({ post }: { post: Post }) => {
  const [highlighter, setHighlighter] = useState<shikiType.HighlighterCore>();
  const [loadedLangs, setLoadedLangs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
    //   setTimeout(async () => {
        const engine = createJavaScriptRegexEngine();
        setHighlighter(
          await createHighlighter({
            langs: [import("shiki/langs/tsx.mjs")],
            langAlias: {
              typescript: "tsx",
              javascript: "tsx",
              js: "tsx",
              ts: "tsx",
            },
            themes: [import("shiki/themes/catppuccin-mocha.mjs")],
            engine: engine,
          })
        );
        setLoadedLangs({
          ...loadedLangs,
          tsx: true,
          typescript: true,
          js: true,
          javascript: true,
          text: true,
          txt: true,
          plain: true,
        });
    //   }, 1500);
    })();
  }, []);

  return (
    <PortableText
      value={post.content}
      components={{
        list: {
          indent: (props) => {
            return <ul className="list-none">{props.children}</ul>;
          },
        },
        block: (props) => {
          const Tag = props.value.style! as any;

          if (/^h\d/.test(Tag)) {
            return (
              <Tag id={props.value.children[0].text}>{props.children}</Tag>
            );
          }

          if (Tag === "blockquote")
            return <blockquote>{props.children}</blockquote>;
          return <p>{props.children}</p>;
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
                  alt={props.value.asset.description ?? "A picture from Sanity"}
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
            if (
              !highlighter ||
              (!!props.value.language && !loadedLangs[props.value.language])
            ) {
              if (highlighter) {
                highlighter
                  .loadLanguage(props.value.language)
                  .then(() => {
                    setLoadedLangs({
                      ...loadedLangs,
                      [props.value.language]: true,
                    });
                  })
                  .catch(() => {
                    console.log("failed to load", props.value.language);
                  });
              }
              return (
                <pre>
                  <code>
                    <Skeleton className="h-[250px] rounded-xl" />
                  </code>
                </pre>
              );
            }
            const html = highlighter.codeToHtml(props.value.code, {
              lang: props.value.language ?? "tsx",
              theme: "catppuccin-mocha",
            });
            return <div dangerouslySetInnerHTML={{ __html: html }} />;
          },
          embed: (props) => {
            return null;
            // const url = props.value.url;
            // return (
            //   <LazyLoad
            //     once
            //     height={150}
            //     placeholder={<Skeleton className="h-[250px] rounded-xl" />}
            //   >
            //     <ReactPlayer url={url} controls />
            //   </LazyLoad>
            // );
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
                      )
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
            if (
              props.value.type === "author" &&
              props.value.slug === "sam-yung"
            )
              return <a href="/about">{props.children}</a>;
            return <a href={`/blog/${props.value.slug}`}>{props.children}</a>;
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
};

export { ReactPortabletext };
