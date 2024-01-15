<script setup lang="ts">
  import { createColumnHelper } from "@tanstack/vue-table";
  const client = useSupabaseClient();

  const { data: recomendationsBackend } = await client
    .from("recomendations")
    .select();

type Recomendation = {
  alert_name: string;
  abstract: string;
  recomendation: string;
};

const columnHelper = createColumnHelper<Recomendation>();
const columns = [
  columnHelper.accessor("alert_name", {
    header: () => "alert_name",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("abstract", {
    header: () => "abstract",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("recomendation", {
    header: () => "recomendation",
    footer: (props) => props.column.id,
  }),
];
</script>

<template>
  <Page title="Recomendations">
  <div class="flex justify-end">
    <Button class="mb-2">
      <NuxtLink to="/logs/scan">Add new recomendation</NuxtLink>
    </Button>
  </div>
  <div v-if="!!recomendationsBackend">
    <Table :columns="columns" :tableData="recomendationsBackend" />
  </div>
  </Page>
</template>
