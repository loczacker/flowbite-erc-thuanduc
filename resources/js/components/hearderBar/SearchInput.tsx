'use client'

import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function SearchInput({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])

  const handleSearch = (value: string) => {
    setQuery(value)
    const fakeResults = [
      'Tài liệu ISO',
      'Báo cáo ESG',
      'Kế hoạch tháng 6',
      'Họp với phòng pháp chế',
      'Đánh giá nội bộ quý 2',
      'Biên bản họp hội đồng',
      'Báo cáo rủi ro môi trường',
      'Chính sách an toàn lao động',
      'Tài liệu huấn luyện nhân sự',
      'Bảng đánh giá nhà cung cấp',
      'Kế hoạch phát triển bền vững',
      'Báo cáo tài chính 2024',
      'Bản tin nội bộ tháng 5',
      'Yêu cầu rà soát pháp lý',
      'Kế hoạch kiểm toán nội bộ',
      'Biên bản kiểm tra nhà máy',
      'Tài liệu đào tạo ESG',
      'Kết quả khảo sát nhân viên',
      'Hợp đồng hợp tác mới',
      'Lịch họp ban chỉ đạo ESG',
      'Báo cáo tiến độ triển khai ISO',
      'Tài liệu chứng nhận môi trường',
      'Danh sách văn bản pháp luật liên quan',
      'Thông báo thay đổi quy trình',
      'Biểu mẫu đăng ký đào tạo',
    ]

    setResults(
      value
        ? fakeResults.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
          )
        : []
    )
  }

  return (
    <>
      {/* Ô input */}
      <div className={`w-full max-w-xs ${className}`}>
        <Input
          type="search"
          placeholder="Tìm kiếm..."
          className="h-9"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          {...props}
        />
      </div>

      {/* Bảng kết quả ở vị trí cố định */}
      {results.length > 0 && (
        <div className="fixed top-24 left-3/4 -translate-x-1/2 z-50 w-[500px] bg-white border shadow-xl rounded-lg overflow-hidden flex flex-col max-h-[400px]">
  {/* Scroll content */}
  <ScrollArea className="max-h-[350px] overflow-auto">
    <div className="px-4 py-2">
      <ul className="space-y-4 text-sm text-muted-foreground">
        {results.map((item, index) => (
          <li key={index} className="hover:text-primary cursor-pointer">
            {item}
            <Separator className="mt-2" />
          </li>
        ))}
      </ul>
    </div>
  </ScrollArea>

  {/* Footer */}
  <div className="border-t p-2 text-center text-sm text-muted-foreground shrink-0">
    Hiển thị {results.length} kết quả
  </div>
</div>

      )}
    </>
  )
}
