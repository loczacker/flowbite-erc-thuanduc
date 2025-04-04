import { useEffect, useState } from "react";
import axios from "axios";

interface Company {
  id: number;
  name: string;
  corporation_id: number;
}

export default function Company() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    axios.get("/api/companies").then((response) => {
      setCompanies(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Công ty</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Tập đoàn</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="border">
              <td className="border p-2">{company.id}</td>
              <td className="border p-2">{company.name}</td>
              <td className="border p-2">{company.corporation_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
