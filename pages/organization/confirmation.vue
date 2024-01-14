<script setup>
const router = useRouter();
const client = useSupabaseClient();
const { data } = await client
  .from("organization_join_requests")
  .select(
    "joined, created_at, profile_id, organization_id, organizations(id, name)",
  )
  .eq("id", router.currentRoute.value.query.id);
console.log(data, "invitation");
const joined = ref(data[0]?.joined);

const onJoinOrganizationClicked = async () => {
  const { error } = await client
    .from("organization_join_requests")
    .update({ joined: true })
    .eq("id", router.currentRoute.value.query.id);
  console.log(error);
  joined.value = true;
};
</script>
<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white"
  >
    <div class="max-w-xl px-5 text-center">
      <h2 class="mb-2 text-[42px] font-bold text-zinc-800">
        Invite confirmation
      </h2>
      <p class="mb-2 text-lg text-zinc-500">
        You have been invited to join the organization
        <strong> {{ data[0].organizations.name }}</strong>
      </p>
      <span v-if="joined">You have joined the organization!</span>
      <Button
        @click="onJoinOrganizationClicked"
        v-if="!joined"
        class="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
        >Join organization</Button
      >
    </div>
  </div>
</template>
