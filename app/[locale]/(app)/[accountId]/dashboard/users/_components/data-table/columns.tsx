"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDate } from "@/lib/utils";
import {
  User,
  UserRole,
  UserStatus,
} from "@/prisma-client/app/generated/prisma/client";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {row.original.image && (
            <Image
              src={row.original.image}
              alt={row.getValue("name")}
              className="mr-2 h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
          )}
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as UserRole;
      return (
        <div className="flex items-center">
          {role === "ADMIN" ? (
            <ShieldAlert className="text-destructive mr-2 h-4 w-4" />
          ) : (
            <Shield className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{role}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value === "all" ? true : row.getValue(id) === value;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as UserStatus;
      return (
        <Badge
          variant={
            status === "ACTIVE"
              ? "default"
              : status === "PENDING"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value === "all" ? true : row.getValue(id) === value;
    },
  },
  {
    accessorKey: "isTwoFactorEnabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="2FA" />
    ),
    cell: ({ row }) => {
      const isTwoFactorEnabled = row.getValue("isTwoFactorEnabled") as boolean;
      return (
        <div className="flex items-center">
          {isTwoFactorEnabled ? (
            <ShieldCheck className="text-success h-4 w-4" />
          ) : (
            <Shield className="text-muted-foreground h-4 w-4" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("createdAt"))}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
