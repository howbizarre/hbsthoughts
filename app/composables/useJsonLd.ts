export interface BlogArticleData {
  title: string;
  description: string;
  date: string;
  path: string;
  author?: string;
  image?: string;
}

export interface BlogListingData {
  title: string;
  description: string;
  articles: BlogArticleData[];
  locale: string;
}

export function useJsonLdBlogListing(data: BlogListingData) {
  const baseUrl = 'https://thoughts.bizarre.how';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: data.title,
    description: data.description,
    url: `${baseUrl}/${data.locale}/articles`,
    inLanguage: data.locale,
    blogPost: data.articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      url: `${baseUrl}${article.path}`,
      datePublished: new Date(article.date).toISOString(),
      dateModified: new Date(article.date).toISOString(),
      author: {
        '@type': 'Person',
        name: article.author || 'HowBizarre'
      },
      publisher: {
        '@type': 'Organization',
        name: 'HowBizarre Thoughts',
        url: baseUrl
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}${article.path}`
      }
    }))
  };

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData)
      }
    ]
  });
}

export function useJsonLdBlogPost(article: BlogArticleData, locale: string) {
  const baseUrl = 'https://thoughts.bizarre.how';
  
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: `${baseUrl}${article.path}`,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: article.author || 'HowBizarre'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HowBizarre Thoughts',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${article.path}`
    }
  };

  if (article.image) {
    structuredData.image = {
      '@type': 'ImageObject',
      url: `${baseUrl}${article.image}`
    };
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData)
      }
    ]
  });
}
