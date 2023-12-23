<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";
import type { Role } from "~/types";

const client = useSupabaseClient();
const { data: profiles } = await useAsyncData("profiles", async () => {
  const { data } = await client.from("profiles").select("*");
  return data;
});
console.log(profiles);
type User = {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  last_signed_in: string;
};

const columnHelper = createColumnHelper<User>();

const onChangeRoleClick = async (userId: string, role: Role) => {
  console.log('hola', userId, role)
  await client
    .from("profiles")
    .update({role: role})
    .eq("id", userId);
};

const columns = [
  columnHelper.accessor("full_name", {
    header: () => "full name",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => "email",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("role", {
  header: () => "role",
  cell: (info) =>
    h(
      "select",
      {
        onChange(event) {
          onChangeRoleClick(info.row.original.id, event.target.value as Role);
        },
      },
      ["admin", "user", "guest"].map((role) =>
        h(
          "option",
          {
            value: role,
            selected: role === info.getValue(),
          },
          role
        )
      )
    ),
  footer: (props) => props.column.id,
}),
  columnHelper.accessor("last_signed_in", {
    header: "last connection",
    footer: (props) => props.column.id,
  }),
];
</script>

<template>
  <Page title="Company users">
    <div class="flex justify-end mb-3">
      <Button styles="bg-green-700 hover:bg-green-900 px-2 py-1.7 text-xs">
        <NuxtLink to="/userManagement/create">Create new company</NuxtLink>
      </Button>
      <Button styles="bg-green-700 hover:bg-green-900 px-2 py-1.7 text-xs">
        <NuxtLink to="/userManagement/create">Add user to company</NuxtLink>
      </Button>
    </div>
    <Table :tableData="profiles" :columns="columns" />
  </Page>
</template>
