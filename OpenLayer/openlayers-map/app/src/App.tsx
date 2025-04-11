import { MapComponent } from "./components/Map";

const App = () => {
  return (
    <div className="h-screen w-full">
      <MapComponent />
    </div>
  );
};

export default App;
// import React, { useEffect, useState } from "react";
// import MapComponent from "./components/Map";
// import { useServiceWorker } from "./hooks/useServiceWorker";
// import { getCachedTileUrls, getImageFromCache } from "./utils/tileUtils";

// const App: React.FC = () => {
//   useServiceWorker();

//   const [tiles, setTiles] = useState<string[]>([]);

//   useEffect(() => {
//     (async () => {
//       const urls = await getCachedTileUrls();
//       const images = await Promise.all(urls.map(getImageFromCache));
//       setTiles(images.filter(Boolean) as string[]);
//     })();
//   }, []);

//   return (
//     <div>
//       <MapComponent />

//       <div className="fixed bg-red-500 bottom-0 left-0 right-0 max-h-[150px] overflow-x-scroll  p-2 flex gap-2 shadow-md">
//         {tiles.map((src, i) => (
//           <img
//             key={i}
//             src={src}
//             alt={`Tile ${i}`}
//             className="w-[128px] h-[128px] object-cover"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
