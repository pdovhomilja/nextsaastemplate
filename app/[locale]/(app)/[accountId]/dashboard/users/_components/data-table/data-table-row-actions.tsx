"use client";

import { Row } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pen,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Trash,
  UserCog,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  UserRole,
  UserStatus,
} from "@/prisma-client/app/generated/prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const user = row.original as User;

  const onRoleChange = async (role: UserRole) => {
    try {
      const response = await fetch(`/api/users/${user.id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) throw new Error("Failed to update user role");

      toast.success("User role updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const onStatusChange = async (status: UserStatus) => {
    try {
      const response = await fetch(`/api/users/${user.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update user status");

      toast.success("User status updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      toast.success("User deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Pen className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserCog className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            Role
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={user.role}
              onValueChange={(value) => onRoleChange(value as UserRole)}
            >
              <DropdownMenuRadioItem value="ADMIN">
                <ShieldAlert className="text-destructive mr-2 h-3.5 w-3.5" />
                Admin
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="USER">
                <Shield className="text-muted-foreground mr-2 h-3.5 w-3.5" />
                User
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShieldQuestion className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            Status
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={user.status}
              onValueChange={(value) => onStatusChange(value as UserStatus)}
            >
              <DropdownMenuRadioItem value="ACTIVE">
                <ShieldCheck className="text-success mr-2 h-3.5 w-3.5" />
                Active
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="PENDING">
                <ShieldQuestion className="text-warning mr-2 h-3.5 w-3.5" />
                Pending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="BLOCKED">
                <Shield className="text-destructive mr-2 h-3.5 w-3.5" />
                Blocked
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
