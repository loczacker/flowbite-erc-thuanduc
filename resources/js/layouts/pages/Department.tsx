import { useEffect, useState } from "react";
import axios from "axios";

interface Department {
  id: number;
  name: string;
  factory_id: number;
}

export default function Department() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    axios.get("/api/departments").then((response) => {
      setDepartments(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Phòng ban</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Nhà máy</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} className="border">
              <td className="border p-2">{dept.id}</td>
              <td className="border p-2">{dept.name}</td>
              <td className="border p-2">{dept.factory_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
