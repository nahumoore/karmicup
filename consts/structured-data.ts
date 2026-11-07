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
