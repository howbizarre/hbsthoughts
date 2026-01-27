import { defineSitemapEventHandler, asSitemapUrl } from '#imports';

export default defineSitemapEventHandler(async (event) => {
  const locales = ['bg', 'en'];
  const urls: ReturnType<typeof asSitemapUrl>[] = [];

  // Add static pages for each locale
  for (const locale of locales) {
    urls.push(asSitemapUrl({ loc: `/${locale}`, priority: 1.0 }));
    urls.push(asSitemapUrl({ loc: `/${locale}/articles`, priority: 0.9 }));
    urls.push(asSitemapUrl({ loc: `/${locale}/help`, priority: 0.7 }));
    urls.push(asSitemapUrl({ loc: `/${locale}/tag`, priority: 0.6 }));
    urls.push(asSitemapUrl({ loc: `/${locale}/competence`, priority: 0.6 }));
  }

  // Get articles for each locale
  for (const locale of locales) {
    const collectionName = `${locale}_articles` as 'bg_articles' | 'en_articles';

    try {
      const articles = await queryCollection(event, collectionName)
        .where('draft', '=', false)
        .all();

      for (const article of articles) {
        urls.push(asSitemapUrl({
          loc: article.path,
          lastmod: article.date ? new Date(article.date).toISOString() : undefined,
          priority: 0.8
        }));
      }
    } catch (e) {
      console.warn(`Failed to query ${collectionName}:`, e);
    }
  }

  return urls;
});
