import React, { useState } from "react";

export const FetchingDataSection = () => {
  const [method, setMethod] = useState<"PUT">("PUT");
  const [response, setResponse] = useState<string>("");
  const [resource, setResource] = useState<string>("api/fruit");

  const samplePutData = {
    genus: "Fragaria",
    name: "Strawberry",
    family: "Rosaceae",
    order: "Rosales",
    nutritions: {
      carbohydrates: 5.5,
      protein: 0,
      fat: 0.4,
      calories: 29,
      sugar: 5.4,
    },
  };

  // Set initial response
  useState(() => {
    setResponse(JSON.stringify(samplePutData, null, 2));
  });

  return (
    <section className="p-6 w-full flex justify-center items-center h-screen">
      <div className="w-[70%] ">
        <div className="mb-6  w-full">
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "PUT")}
              className="border border-gray-300 text-gray-400 px-4 py-2 rounded"
            >
              <option value="PUT">PUT</option>
            </select>
            <input
              type="text"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              className="border border-gray-300 text-gray-400 flex-1 px-4 py-2 rounded"
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg mb-2 text-gray-400 font-[300]">Response</h2>
          <textarea
            value={response}
            readOnly
            className="w-full h-[300px] text-gray-500 font-[300] border rounded p-4 font-mono focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
};
