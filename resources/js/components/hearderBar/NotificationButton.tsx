'use client'

import { useState, useRef } from 'react'
import { BellIcon } from 'lucide-react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export function NotificationButton() {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Thông báo</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-96 p-0 z-50 shadow-xl rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4 pb-2">
          <h4 className="text-base font-semibold">Thông báo mới</h4>
        </div>
        <Separator />

        <ScrollArea className="max-h-80 px-4 py-2">
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              - Bạn có bình luận mới từ khách hàng
              <Separator className="mt-2" />
            </li>
            <li>
              - Hệ thống đã cập nhật lúc 9h sáng
              <Separator className="mt-2" />
            </li>
            <li>
              - Lịch họp hôm nay vào lúc 15h
              <Separator className="mt-2" />
            </li>
            <li>
              - Yêu cầu tài liệu từ phòng Pháp chế
              <Separator className="mt-2" />
            </li>
          </ul>
        </ScrollArea>

        <div className="border-t p-3 text-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground hover:underline"
          >
            Xem tất cả thông báo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
