<template>
  <section
    class="dark:bg-gray-900 py-8 lg:py-16 antialiased"
    v-if="!!sortedData"
  >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion
        </h2>
      </div>
      <CommentForm :table="props.table" :id="props.id" :parentId="undefined"/>
      <Comment
        :comment="comment"
        :table="props.table"
        :id="props.id"
        v-for="comment in sortedData"
        :key="props.id"
      />
  </section>
</template>

<script setup>
const props = defineProps({
  table: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
const client = useSupabaseClient();
const { data } = await useAsyncData(
  `${props.table}_comment_section`,
  async () => {
    const { data } = await client
      .from(`${props.table}_comments`)
      .select(
        `id, content, created_at, profile_id, profiles (avatar_url, full_name )`,
      )
      .eq(`${props.table}_id`, props.id)
      .is("parent_id", null);
    return data;
  },
);
const sortedData = data?.value.sort((a, b) => {
  const nameA = a.created_at;
  const nameB = b.created_at;
  if (a.created_at < b.created_at) {
    return 1;
  }
  if (a.created_at > b.created_at) {
    return -1;
  }
  return 0;
});
</script>
