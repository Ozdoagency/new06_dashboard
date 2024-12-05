"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { cn } from "/workspaces/new06_dashboard/src/lib/utils.ts"

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
        caption: "flex items-center justify-between px-2 py-2",
        caption_label: "text-sm font-medium text-gray-900",
        nav: "flex space-x-1",
        nav_button: cn(
          "h-8 w-8 bg-transparent hover:bg-blue-50",
          "flex items-center justify-center rounded-full",
          "transition-colors focus:outline-none"
        ),
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center relative [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 rounded-md transition-all duration-200",
        day_selected: "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600 focus:text-white",
        day_today: "bg-blue-50 text-blue-600 font-semibold",
        day_range_middle: "aria-selected:bg-blue-50 aria-selected:text-blue-900",
        day_hidden: "invisible",
        day_disabled: "text-gray-400 opacity-50",
        day_range_end: "bg-blue-600 text-white",
        day_range_start: "bg-blue-600 text-white",
        day_outside: "text-gray-400 opacity-50 aria-selected:bg-blue-50/50 aria-selected:text-gray-400 aria-selected:opacity-30",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-5 w-5 text-gray-600" />,
        IconRight: () => <ChevronRight className="h-5 w-5 text-gray-600" />
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }