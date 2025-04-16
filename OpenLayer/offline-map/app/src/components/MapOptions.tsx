export const MapOptions = ({
  onDrawingToggle,
}: {
  onDrawingToggle: (isDrawBox: boolean) => void;
}) => {
  return (
    <div className="w-max h-10 backdrop-blur-xs p-2 rounded-md shadow absolute top-20 right-14">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="form-checkbox h-3 w-3 text-blue-600"
          onChange={(e) => onDrawingToggle(e.target.checked)}
        />
        <small>Draw Box shape</small>
      </div>
    </div>
  );
};
