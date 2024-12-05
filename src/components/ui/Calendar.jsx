"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { cn } from "../../lib/utils" // Обновленный импорт

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-white rounded-lg shadow-lg border", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-between items-center pt-1 relative px-4", // изменено для размещения стрелок рядом с названием месяца
        caption_label: "text-sm font-medium",
        nav: "flex items-center space-x-2", // изменено для размещения стрелок рядом с названием месяца
        nav_button: "h-7 w-7 bg-transparent p-0 hover:bg-blue-50 rounded-full",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center",
        day: "h-9 w-9 p-0 font-normal hover:bg-blue-50 rounded-full flex items-center justify-center transition-colors",
        day_selected: "bg-blue-600 text-white hover:bg-blue-700",
        day_today: "bg-blue-50 text-blue-600 font-semibold",
        day_outside: "text-gray-400 opacity-50",
        day_disabled: "text-gray-400 opacity-50",
        day_range_middle: "bg-blue-50 text-blue-600 rounded-none",
        day_hidden: "invisible",
        day_range_end: "bg-blue-600 text-white rounded-r-full",
        day_range_start: "bg-blue-600 text-white rounded-l-full",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }