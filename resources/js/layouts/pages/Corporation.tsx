import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

export default function Corporation() {
  const [corporations, setCorporations] = useState([]);

  useEffect(() => {
    fetch('/api/corporations')
      .then((res) => res.json())
      .then((data) => setCorporations(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Tập đoàn</h1>
      <Button color="primary">Thêm mới Tập đoàn</Button>
      <table className="w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
          </tr>
        </thead>
        <tbody>
          {corporations.map((corp: any) => (
            <tr key={corp.id} className="border">
              <td className="border p-2">{corp.id}</td>
              <td className="border p-2">{corp.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
