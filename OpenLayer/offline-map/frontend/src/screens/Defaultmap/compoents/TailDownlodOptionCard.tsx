export const TailDownlodOptionCard = () => {
  return (
    <div className="w-64 h-18 p-2 rounded border border-white/50 shadow/10 backdrop-blur-xs">
      <h1 className="text-xs font-medium text-center">Download Tail</h1>
      <div className="flex gap-2">
        <button className="w-full h-8 rounded border border-white/50 shadow/10 backdrop-blur-xs flex items-center justify-center gap-2 cursor-pointer bg-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 16v-8m0 8l-4-4m4 4l4-4M4 20h16"
            />
          </svg>
          <span className="text-xs font-medium text-white">Download Tail</span>
        </button>
      </div>
    </div>
  );
};
