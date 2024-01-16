<script setup lang="ts">
  import { createColumnHelper } from "@tanstack/vue-table";
  const client = useSupabaseClient();
  const modalIsOpen = ref(false);
  const clickedLog = ref({});

function setModalIsOpen(value: boolean) {
  modalIsOpen.value = value;
}
  const { data: recomendationsBackend } = await client
    .from("recomendations")
    .select();

type Recomendation = {
  id: string;
  alert_name: string;
  abstract: string;
  recomendation: string;
};

const columnHelper = createColumnHelper<Recomendation>();
const columns = [
  columnHelper.accessor("alert_name", {
    header: () => "alert name",
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

const onRowClicked = (row) => {
  clickedLog.value = row.original;
  modalIsOpen.value = true;
}
</script>

<template>
  <RecomendationModal :id="clickedLog?.recomendation_id" :title="clickedLog?.alert_name" :abstract="clickedLog?.abstract" :text="clickedLog?.recomendation" :isOpen="modalIsOpen" :setIsOpen="setModalIsOpen"/>
  <Page title="Recomendations">
  <div v-if="!!recomendationsBackend">
    <Table :columns="columns" :tableData="recomendationsBackend" :onRowClicked="onRowClicked"/>
  </div>
  </Page>
</template>
