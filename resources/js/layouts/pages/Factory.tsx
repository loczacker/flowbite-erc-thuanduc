import { useEffect, useState } from "react";
import axios from "axios";

interface Factory {
  id: number;
  name: string;
  company_id: number;
}

export default function Factory() {
  const [factories, setFactories] = useState<Factory[]>([]);

  useEffect(() => {
    axios.get("/api/factories").then((response) => {
      setFactories(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Nhà máy</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Công ty</th>
          </tr>
        </thead>
        <tbody>
          {factories.map((factory) => (
            <tr key={factory.id} className="border">
              <td className="border p-2">{factory.id}</td>
              <td className="border p-2">{factory.name}</td>
              <td className="border p-2">{factory.company_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
