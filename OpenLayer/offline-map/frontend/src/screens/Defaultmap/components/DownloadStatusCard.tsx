export const DownloadStatusCard = ({
  isVisible,
  progress,
  isCompleted,
  onClose,
  onCancelDownload,
}: {
  isVisible: boolean;
  progress: number;
  isCompleted: boolean;
  onClose: () => void;
  onCancelDownload: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
        // onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42.0625rem] h-[11.6875rem] bg-[#0C1012] rounded-[0.5rem] px-[1rem] py-[2rem] z-50">
        <h1 className="text-[1.5rem] font-normal text-[#E8E7E7] leading-[2rem] tracking-[0.00625rem] text-center mb-[1rem]">
          {isCompleted ? "Download Complete!" : "Downloading...."}
        </h1>
        <div className="h-[1rem] w-full mb-[2rem] bg-[#333]">
          <div
            className="h-full bg-[#4976BA] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {!isCompleted && (
          <div className="flex items-center justify-center">
            <button
              onClick={onCancelDownload}
              className="w-[5.937rem] h-[1.687rem] cursor-pointer bg-[#0E88D3] text-[#FFFFFF] leading-[1.25rem] tracking-[0.00625rem] font-medium flex items-center justify-center rounded-[0.25rem] border-[0.1rem] border-[#0E88D3]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};
