export default defineEventHandler(async (event) => {
  const { collectionName } = getQuery(event) as { collectionName: 'articles_bg' | 'articles_en' };

  // Добавете проверка, за да сте сигурни, че collectionName е налично
  if (!collectionName || typeof collectionName !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Query parameter "collectionName" is required'
    });
  }

  const sections = await queryCollectionSearchSections(event, collectionName);
  return sections;
});
