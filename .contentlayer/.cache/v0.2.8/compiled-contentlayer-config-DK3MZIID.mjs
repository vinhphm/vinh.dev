// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import path from "path";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings
} from "pliny/mdx-plugins.js";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
var root = process.cwd();
var computedFields = {
  readingTime: {
    type: "json",
    resolve: (doc) => readingTime(doc.body.raw)
  },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath
  },
  toc: {
    type: "string",
    resolve: (doc) => extractTocHeadings(doc.body.raw)
  }
};
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    tags: {
      type: "list",
      of: {
        type: "string"
      }
    },
    lastmod: {
      type: "date"
    },
    draft: {
      type: "boolean"
    },
    summary: {
      type: "string"
    },
    images: {
      type: "list",
      of: {
        type: "string"
      }
    },
    authors: {
      type: "list",
      of: {
        type: "string"
      }
    },
    layout: {
      type: "string"
    },
    bibliography: {
      type: "string"
    },
    canonicalUrl: {
      type: "string"
    }
  },
  computedFields
}));
var Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      required: true
    },
    avatar: {
      type: "string"
    },
    occupation: {
      type: "string"
    },
    company: {
      type: "string"
    },
    email: {
      type: "string"
    },
    twitter: {
      type: "string"
    },
    linkedin: {
      type: "string"
    },
    github: {
      type: "string"
    },
    layout: {
      type: "string"
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      [
        remarkFootnotes,
        {
          inlineNotes: true
        }
      ],
      remarkMath,
      remarkImgToJsx
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [
        rehypeCitation,
        {
          path: path.join(root, "data")
        }
      ],
      [
        rehypePrismPlus,
        {
          ignoreMissing: true
        }
      ],
      rehypePresetMinify
    ]
  }
});
export {
  Authors,
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-DK3MZIID.mjs.map
