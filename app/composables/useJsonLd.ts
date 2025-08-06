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

export function useJsonLdBlogListing(
  title: Ref<string | undefined> | ComputedRef<string | undefined>,
  description: Ref<string | undefined> | ComputedRef<string | undefined>,
  articles: Ref<BlogArticleData[]> | ComputedRef<BlogArticleData[]>,
  locale: Ref<string> | ComputedRef<string>
) {
  const baseUrl = 'https://thoughts.bizarre.how';
  
  const structuredData = computed(() => {
    if (!title.value || !description.value || !articles.value?.length) {
      return null;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: title.value,
      description: description.value,
      url: `${baseUrl}/${locale.value}/articles`,
      inLanguage: locale.value,
      blogPost: articles.value.map((article) => ({
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
  });

  useHead({
    script: computed(() => {
      if (!structuredData.value) return [];
      
      return [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData.value)
        }
      ];
    })
  });
}

export function useJsonLdBlogPost(
  article: Ref<BlogArticleData | null> | ComputedRef<BlogArticleData | null>,
  locale: Ref<string> | ComputedRef<string>
) {
  const baseUrl = 'https://thoughts.bizarre.how';
  
  const structuredData = computed(() => {
    if (!article.value) {
      return null;
    }

    const data: any = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.value.title,
      description: article.value.description,
      url: `${baseUrl}${article.value.path}`,
      datePublished: new Date(article.value.date).toISOString(),
      dateModified: new Date(article.value.date).toISOString(),
      inLanguage: locale.value,
      author: {
        '@type': 'Person',
        name: article.value.author || 'HowBizarre'
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
        '@id': `${baseUrl}${article.value.path}`
      }
    };

    if (article.value.image) {
      data.image = {
        '@type': 'ImageObject',
        url: `${baseUrl}${article.value.image}`
      };
    }

    return data;
  });

  useHead({
    script: computed(() => {
      if (!structuredData.value) return [];
      
      return [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData.value)
        }
      ];
    })
  });
}
