import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
export type WaypointProp = {
  coordinates: number[];
  id: string;
  altitude: number;
  heading: number;
  flightSpeed: number;
  seqID: number;
  routine: {
    type: string;
  };
  type: string;
};

export const UserItem = ({ waypoint }: WaypointProp) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id: waypoint.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className="bg-blue-200 p-4 rounded shadow-md flex justify-between items-center"
    >
      <div>
        <h3 className="text-lg text-black font-semibold">{waypoint.id}</h3>
        <p className="text-gray-600">{waypoint.seqID}</p>
      </div>
      <button {...attributes} {...listeners} className="cursor-move">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
      </button>
    </div>
  );
};
