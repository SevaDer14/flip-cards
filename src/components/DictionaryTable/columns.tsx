import { DictionaryRecord } from "@/lib/types";
import { ColumnDef, RowModel } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getTags(rows: any[]) {
  const result: string[] = [];

  for (const row of rows) {
    const val = row.getValue("tags")[0];
    console.log(val);
    if (!result.includes(val)) result.push(val);
  }

  return result;
}

export const columns: ColumnDef<DictionaryRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "word",
    header: "Eng",
  },
  {
    accessorKey: "translations.se",
    header: "Se",
  },
  {
    accessorKey: "tags",
    filterFn: "includesString",
    header: ({ table }) => (
      <Select
        value={(table.getColumn("tags")?.getFilterValue() as string) ?? ""}
        onValueChange={(val) => {
          if (val === "all") return table.getColumn("tags")?.setFilterValue("");
          return table.getColumn("tags")?.setFilterValue(val);
        }}
      >
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder="Tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">all</SelectItem>
          {getTags(table.getPreFilteredRowModel().rows).map((tag: string) => (
            <SelectItem value={tag}>{tag}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "viewCount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Viewed
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <p className="text-center">{row.getValue("viewCount")}</p>
    ),
  },
  {
    id: "successRate",
    header: () => <p className="text-center">% correct</p>,
    cell: ({ row }) => {
      if (row.original.viewCount === 0)
        return <p className="text-center">--</p>;

      const ratio = row.original.correctCount / row.original.viewCount;
      return <p className="text-center">{`${Math.floor(ratio * 100)} %`}</p>;
    },
  },
];
