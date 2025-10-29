import React from "react";

export const UseEffect = () => {
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center gap-5">
      {data
        .filter((item) => item.id % 2 === 0)
        .map((item) => (
          <h1 key={item.id}>{item.id}</h1>
        ))}
    </div>
  );
};
