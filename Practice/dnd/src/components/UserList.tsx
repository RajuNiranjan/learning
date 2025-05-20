import React, { useState } from "react";
import { UserItem } from "./UserItem";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const data = [
  {
    coordinates: [77.51771996307856, 12.946224707239693],
    id: "823EIFc",
    altitude: 0,
    heading: 0,
    flightSpeed: 0,
    seqID: 0,
    routine: {
      type: "takeoff",
    },
    type: "takeoff",
  },
  {
    coordinates: [77.51740078020579, 13.015266017688987],
    id: "X6f6wME",
    altitude: 0,
    heading: 0,
    flightSpeed: 0,
    seqID: 1,
    type: "waypoint",
  },
  {
    coordinates: [77.54978308964259, 13.016249924434916],
    id: "SidEM4F",
    altitude: 0,
    heading: 0,
    flightSpeed: 0,
    seqID: 2,
    type: "waypoint",
  },
  {
    coordinates: [77.59085039186961, 13.014116161562683],
    id: "k9AvJe0",
    altitude: 0,
    heading: 0,
    flightSpeed: 0,
    seqID: 3,
    type: "waypoint",
  },
  {
    coordinates: [77.63228918004519, 13.01485572872869],
    id: "4OvQCMZ",
    altitude: 0,
    heading: 0,
    flightSpeed: 0,
    seqID: 4,
    type: "waypoint",
  },
  {
    coordinates: [77.6602042703677, 13.014774716178536],
    id: "fhOYqGA",
    altitude: 0,
    heading: 0,
    flightSpeed: 0,
    seqID: 5,
    type: "waypoint",
  },
  {
    coordinates: [77.66427452254777, 12.956449273118139],
    id: "YBgoPRq",
    altitude: 0,
    heading: 0,
    flightSpeed: 0,
    seqID: 6,
    type: "waypoint",
  },
];

export const UserList = () => {
  const [waypointData, setWaypointData] = useState(data);

  const handleDragEnds = (e: DragEndEvent) => {
    const { active, over } = e;

    console.log("active", active, "over", over);

    if (over && active.id !== over.id) {
      setWaypointData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-w-2xl mx-auto grid gap-2 my-10">
      <h2 className="text-2xl font-bold-mb-4">User List</h2>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnds}
      >
        <SortableContext items={waypointData}>
          <div className="grid gap-2">
            {waypointData.map((waypoint, idx) => (
              <UserItem key={idx} waypoint={waypoint} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
