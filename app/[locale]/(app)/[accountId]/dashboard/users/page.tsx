import { getUsers } from "@/actions/users/get-users";
import React from "react";
import { DataTable } from "./_components/data-table/data-table";

const UsersAdminPage = async () => {
  const users = await getUsers();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all users in the system
          </p>
        </div>
      </div>
      <DataTable data={users} />
    </div>
  );
};

export default UsersAdminPage;
