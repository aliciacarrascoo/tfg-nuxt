<script setup lang="ts">
import { FlexRender, getCoreRowModel, useVueTable } from "@tanstack/vue-table";

const props = defineProps({
  tableData: {
    type: Array<any>,
    required: true,
  },
  columns: {
    type: Array<any>,
    required: true,
  },
  onRowClicked: {
    type: Function,
    required: false,
  },
});

const data = ref(props.tableData);

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
    v-if="props.tableData"
  >
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            class="px-6 py-3"
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          @click="(e) => props.onRowClicked(row)"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          :class="onRowClicked ? 'cursor-pointer' : 'cursor-default'"
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <td
            class="px-6 py-4"
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
