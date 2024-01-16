<!-- CommentForm.vue -->
<template>
  <div
    class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <textarea
      v-model="text"
      rows="6"
      class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
      placeholder="Write a comment..."
      required
    ></textarea>
  </div>
  <Button
    @click="onPostClicked"
    styles="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
  >
    Post comment
  </Button>
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
  parentId: { type: String },
});
const text = ref(undefined);
const client = useSupabaseClient();
const onPostClicked = ref(undefined);
const loadingStore = useLoadingStore();
const postComment = (currentUserProfile) => async () => {
  loadingStore.setLoading(true);
  await client.from(`${props.table}_comments`).insert({
    [`${props.table}_id`]: props.id,
    content: text.value,
    parent_id: props.parentId,
    profile_id: currentUserProfile?.value?.id,
  });
  reloadNuxtApp();
};
onMounted(async () => {
  const currentUserProfile = await useCurrentUserProfile();
  onPostClicked.value = postComment(currentUserProfile);
});
</script>
