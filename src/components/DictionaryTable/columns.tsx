import { DictionaryRecord } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

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
    header: "Tag",
  },
  {
    accessorKey: "viewCount",
    header: "Viewed",
  },
  {
    id: "successRate",
    header: "% correct",
    cell: ({ row }) => {
      if (row.original.viewCount === 0) return "0";
      const ratio = row.original.correctCount / row.original.viewCount;
      return `${Math.floor(ratio * 100)} %`;
    },
  },
];
