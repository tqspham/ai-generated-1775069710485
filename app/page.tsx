"use client";

import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type DataItem = {
  id: number;
  title: string;
  body: string;
};

export default function Page() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data: DataItem[]) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-center mt-10">No data available.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data List</h1>
      <ul className="space-y-4">
        {data.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2">{item.body}</p>
            <img
              src={"https://loremflickr.com/320/240?random=" + item.id}
              alt="Random"
              className="mt-4 w-full h-auto rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}