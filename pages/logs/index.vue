<script setup lang='ts'>
  import { createColumnHelper } from "@tanstack/vue-table";
const client = useSupabaseClient();

const logsBackend = ref(undefined)
onMounted(async ()=>{
const { data } = await client.from("scans").select("result_id, severity")
logsBackend.value = data;
})

type Log = {
  result_id: string;
  severity: string;
};

const columnHelper = createColumnHelper<Log>();
const columns = [
  columnHelper.accessor("result_id", {
    header: () => "id",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("severity", {
    header: () => "severity",
    footer: (props) => props.column.id,
  })
];
</script>

<template>
  <Page title="Logs">
    <Button
        styles="bg-green-700 hover:bg-green-900 px-2 py-1.7 text-xs"
      >
        <NuxtLink to="/logs/scan">Scan new log</NuxtLink>
    </Button>
    <div v-if="!!logsBackend">
      <Table :columns='columns' :tableData='logsBackend'/>
    </div>
    
  </Page>
</template>
