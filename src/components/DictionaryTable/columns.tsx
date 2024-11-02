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
    header: () => <p className="text-center">Viewed</p>,
    cell: ({ row }) => (
      <p className="text-center">{row.getValue("viewCount")}</p>
    ),
  },
  {
    id: "successRate",
    header: () => <p className="text-center">% correct</p>,
    cell: ({ row }) => {
      if (row.original.viewCount === 0) return <p className="text-center">0</p>;

      const ratio = row.original.correctCount / row.original.viewCount;
      return <p className="text-center">{`${Math.floor(ratio * 100)} %`}</p>;
    },
  },
];
