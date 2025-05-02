"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Shield, ShieldCheck, ShieldQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableViewOptions } from "./data-table-view-options";
import {
  UserRole,
  UserStatus,
} from "@/prisma-client/app/generated/prisma/client";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by name or email..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("role") && (
          <Select
            value={
              (table.getColumn("role")?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) =>
              table
                .getColumn("role")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="h-8 w-[70px] lg:w-[110px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value={UserRole.ADMIN}>
                <div className="flex items-center">
                  <Shield className="text-destructive mr-2 h-3.5 w-3.5" />
                  Admin
                </div>
              </SelectItem>
              <SelectItem value={UserRole.USER}>
                <div className="flex items-center">
                  <Shield className="text-muted-foreground mr-2 h-3.5 w-3.5" />
                  User
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        {table.getColumn("status") && (
          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) =>
              table
                .getColumn("status")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="h-8 w-[80px] lg:w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={UserStatus.ACTIVE}>
                <div className="flex items-center">
                  <ShieldCheck className="text-success mr-2 h-3.5 w-3.5" />
                  Active
                </div>
              </SelectItem>
              <SelectItem value={UserStatus.PENDING}>
                <div className="flex items-center">
                  <ShieldQuestion className="text-warning mr-2 h-3.5 w-3.5" />
                  Pending
                </div>
              </SelectItem>
              <SelectItem value={UserStatus.BLOCKED}>
                <div className="flex items-center">
                  <Shield className="text-destructive mr-2 h-3.5 w-3.5" />
                  Blocked
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
