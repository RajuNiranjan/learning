import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";

export interface Tile {
  id: number;
  name: string;
  thubmnailbase64img: string;
  extent: number[];
  center: number[];
  zoom: number[];
  projection: string;
}

export const MapThumbNailCard = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(error);

  console.log(tiles);

  useEffect(() => {
    const fetchTileData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(`/api/v1/tile/`);
        setTiles(res.data.tiles);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching tile data");
        setIsLoading(false);
      }
    };
    fetchTileData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        tiles.map((tile, idx) => {
          return (
            <Link
              to={`/offline-map/${tile?.name}/${tile?.id}`}
              key={idx}
              className="h-52 w-72 rounded shadow-md relative overflow-hidden"
            >
              <img
                src={`data:image/png;base64,${tile?.thubmnailbase64img}`}
                alt="map-thumbnail"
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white ">
                <h3 className="text-lg font-bold">{tile?.name}</h3>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
};
