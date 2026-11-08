import { LANDING_FAQS } from "@/consts/faqs";
import {
  FOUNDER,
  PAGE_SEO,
  SITE_NAME,
  SITE_URL,
} from "@/consts/seo-metadata";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/about#founder`;

const founder = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER.name,
  url: FOUNDER.url,
  sameAs: [FOUNDER.x],
};

/** Home page graph: organization, website, the app itself and the FAQ. */
export const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      founder: { "@id": FOUNDER_ID },
      sameAs: [FOUNDER.x],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      description: PAGE_SEO.home.description,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "WebApplication",
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Web",
      description:
        "Free Reddit engagement exchange. Members upvote and comment on each other's Reddit posts and comments, earning points that they spend to get engagement on their own content.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "FAQPage",
      mainEntity: LANDING_FAQS.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    founder,
  ],
};

const BLOG_URL = `${SITE_URL}/blog`;

/** Blog index: a collection page listing every article. */
export function buildBlogIndexStructuredData(
  posts: { slug: string; title: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: BLOG_URL,
    name: `${PAGE_SEO.blog.title} | ${SITE_NAME}`,
    description: PAGE_SEO.blog.description,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BLOG_URL}/${post.slug}`,
        name: post.title,
      })),
    },
  };
}

/** Blog article: BlogPosting + breadcrumbs + FAQ (when the article has one). */
export function buildArticleStructuredData(article: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  cover?: { src: string };
  faqs: { question: string; answer: string }[];
}) {
  const url = `${BLOG_URL}/${article.slug}`;
  const ogImage = `${SITE_URL}/opengraph-image`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        url,
        mainEntityOfPage: url,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "en",
        image: article.cover
          ? [`${SITE_URL}${article.cover.src}`, ogImage]
          : ogImage,
        author: founder,
        publisher: {
          "@type": "Organization",
          "@id": ORGANIZATION_ID,
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/icon.svg`,
        },
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: BLOG_URL },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
      ...(article.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: article.faqs.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ]
        : []),
    ],
  };
}

/** About page: the founder as the main entity of a profile page. */
export const ABOUT_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: FOUNDER.url,
  name: `${PAGE_SEO.about.title} | ${SITE_NAME}`,
  mainEntity: {
    ...founder,
    jobTitle: "Founder",
    worksFor: { "@id": ORGANIZATION_ID, "@type": "Organization", name: SITE_NAME },
  },
};
