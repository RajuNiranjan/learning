export const MapThumbNailCard = () => {
  return (
    <div className="h-52 w-72 rounded shadow-md relative overflow-hidden">
      <img
        src="public/images/map-thumbnail.png"
        alt="map-thumbnail"
        className="w-full h-full object-cover rounded"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white ">
        <h3 className="text-lg font-bold">Bangalore</h3>
        <p className="text-sm text-gray-800">This is a map of the world.</p>
      </div>
    </div>
  );
};
