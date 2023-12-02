<script setup lang="ts">
  import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    createColumnHelper,
  } from "@tanstack/vue-table";
  import type { Role } from '~/types';
  
  type User = {
    fullName: string;
    email: string;
    role: Role;
    lastConnection: string;
  };

  const data = ref<Array<User>>([
    {
      fullName: "tanner",
      email: "tanner@gmail.com",
      role: "admin",
      lastConnection: "12-03-12"
    },
    {
      fullName: "alex",
      email: "alex@gmail.com",
      role: "admin",
      lastConnection: "12-03-12"
    }
  ]);

  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("fullName", {
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("email", {
      header: () => "email",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("role", {
      header: () => "role",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("lastConnection", {
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
    <Table :tableData=data :columns=columns />
  </Page>
</template>
