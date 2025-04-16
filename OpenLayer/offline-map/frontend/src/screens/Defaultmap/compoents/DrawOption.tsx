type DrawOptionProps = {
  isDrawShape: boolean;
  setIsDrawShape: (isDrawShape: boolean) => void;
};

export const DrawOption = ({
  isDrawShape,
  setIsDrawShape,
}: DrawOptionProps) => {
  return (
    <div className="w-28 h-10  absolute top-14 right-5">
      <button
        type="button"
        className={`${
          isDrawShape
            ? "bg-blue-500 text-white"
            : "bg-white/80 border border-white text-gray-500"
        } rounded-md text-xs tracking-wider h-8 w-full cursor-pointer`}
        onClick={() => setIsDrawShape(!isDrawShape)}
      >
        Draw shape
      </button>
    </div>
  );
};
