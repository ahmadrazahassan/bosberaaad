import type { Faq } from "@/lib/faq";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";
import type { Article, Review, Software } from "@/lib/types";
import { stripHtml, truncate } from "@/lib/utils";

/** Renders a JSON-LD block. One component, used by every page that needs one. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Serialised server side from our own data, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: { "@type": "Country", name: "South Africa" },
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-ZA",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function productSchema(software: Software, reviews: Review[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/software/${software.slug}#product`,
    name: software.name,
    description: software.description_short,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/software/${software.slug}`,
    ...(software.vendor_name
      ? { author: { "@type": "Organization", name: software.vendor_name } }
      : {}),
    ...(software.starting_price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: software.starting_price,
            priceCurrency: software.price_currency,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/software/${software.slug}`,
          },
        }
      : {}),
    ...(software.review_count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: software.overall_rating,
            reviewCount: software.review_count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    review: reviews.slice(0, 5).map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.reviewer_name },
      datePublished: review.review_date.slice(0, 10),
      name: review.review_title,
      reviewBody: truncate(review.summary, 400),
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.overall_rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_date,
    dateModified: article.published_date,
    inLanguage: "en-ZA",
    author: {
      "@type": "Person",
      name: article.author_name,
      jobTitle: article.author_title,
      description: article.author_bio,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
    wordCount: stripHtml(article.content).split(/\s+/).length,
  };
}

export function comparisonSchema(a: Software, b: Software, pair: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${a.name} compared with ${b.name}`,
    url: `${SITE_URL}/compare/${pair}`,
    itemListElement: [a, b].map((software, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: software.name,
        applicationCategory: "BusinessApplication",
        url: `${SITE_URL}/software/${software.slug}`,
        ...(software.review_count > 0
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: software.overall_rating,
                reviewCount: software.review_count,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
      },
    })),
  };
}
