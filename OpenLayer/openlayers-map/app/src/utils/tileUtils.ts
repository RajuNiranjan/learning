// export const getCachedTileUrls = async (): Promise<string[]> => {
//   const cache = await caches.open('ol-tiles-cache');
//   const keys = await cache.keys();
//   return keys
//     .map((req) => req.url)
//     .filter((url) => url.includes('tile.openstreetmap.org'));
// };

// export const getImageFromCache = async (url: string): Promise<string | null> => {
//   const cache = await caches.open('ol-tiles-cache');
//   const response = await cache.match(url);
//   if (!response) return null;

//   const blob = await response.blob();
//   return URL.createObjectURL(blob);
// };
