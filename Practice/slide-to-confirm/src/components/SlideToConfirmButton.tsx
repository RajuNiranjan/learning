import { useState, useEffect, useRef } from "react";

export default function SlideToConfirm() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsConfirmed(true);
        setSliderPosition(100);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Handle mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width - 60; // subtract slider width
      const mouseX = e.clientX - rect.left - 30; // center the slider

      let newPosition = (mouseX / containerWidth) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));

      setSliderPosition(newPosition);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);

        if (sliderPosition >= 75) {
          setIsConfirmed(true);
          setSliderPosition(100);
        } else {
          setSliderPosition(0);
        }
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, sliderPosition]);

  const handleMouseDown = () => {
    if (!isConfirmed) {
      setIsDragging(true);
    }
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setSliderPosition(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">
          Slide to Confirm
        </h1>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className={`relative w-full h-16 rounded-full transition-colors duration-300 ${
            isConfirmed ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium pointer-events-none">
            {isConfirmed ? "Confirmed!" : "Slide to confirm →"}
          </div>

          {/* Slider Ball */}
          <div
            className={`absolute top-2 w-12 h-12 rounded-full shadow-lg cursor-pointer transition-colors duration-200 flex items-center justify-center text-white font-bold ${
              isConfirmed ? "bg-green-700" : "bg-red-500 text-gray-700"
            }`}
            style={{
              left: `${sliderPosition}%`,
              transform: "translateX(-0%)",
              transition: isDragging ? "none" : "left 0.3s ease",
            }}
            onMouseDown={handleMouseDown}
          >
            {isConfirmed ? "✓" : "→"}
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 text-center">
          <p className="text-lg font-medium">
            Status:{" "}
            <span className={isConfirmed ? "text-green-600" : "text-gray-600"}>
              {isConfirmed ? "Confirmed" : "Not Confirmed"}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Position: {Math.round(sliderPosition)}%
          </p>
        </div>
        {isConfirmed && (
          <button
            onClick={handleReset}
            className="mt-6 w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
