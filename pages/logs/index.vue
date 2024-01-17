<script setup lang="ts">
import { createColumnHelper } from "@tanstack/vue-table";
const client = useSupabaseClient();
const currentUserProfile = await useCurrentUserProfile();

const { data: userOrganization } = await client.from("profiles").select("organization_id").eq("id", currentUserProfile.value.id).single();
const { data: organizationScans } = await client
    .from("scans")
    .select(
      "result_id, severity, alert, created, profile_id, profiles(full_name)",
    ).eq("organization_id", userOrganization?.organization_id).neq("profile_id", currentUserProfile.value.id);

const { data: userScans } = await client
    .from("scans")
    .select(
      "result_id, severity, alert, created, profile_id, profiles(full_name)",
    ).eq("profile_id", currentUserProfile.value.id);

const logsBackend = [];
logsBackend.push(...organizationScans);
logsBackend.push(...userScans);

console.log(organizationScans, userScans, logsBackend);
type Log = {
  result_id: string;
  severity: string;
  alert: string;
  created: string;
  user_full_name: string;
};
const modalIsOpen = ref(false);
const columnHelper = createColumnHelper<Log>();
const columns = [
  columnHelper.accessor("result_id", {
    header: () => "id",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("severity", {
    header: () => "severity",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("alert", {
    header: () => "alert",
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("created", {
    header: () => "created",
    cell: (info) => formatDate(info.getValue()),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("profiles", {
    header: () => "Scanned by",
    cell: (info) => info.getValue()?.full_name,
    footer: (props) => props.column.id,
  }),
];

const onRowClicked = (row) => {
  navigateTo(`/logs/scan/${row.original.result_id}`);
};

const newLogClicked = () => {
  modalIsOpen.value = true;
}

function setModalIsOpen(value: boolean) {
  modalIsOpen.value = value;
}
</script>

<template>
  <Page title="Logs">
  <NewLogModal :isOpen="modalIsOpen" :setIsOpen="setModalIsOpen"/>
    <div class="flex justify-end">
      <Button @click="newLogClicked" class="mb-2">
        Scan new log
      </Button>
    </div>
    <div v-if="!!logsBackend">
      <Table
        :columns="columns"
        :tableData="logsBackend"
        :onRowClicked="onRowClicked"
      />
    </div>
  </Page>
</template>
