<template>
  <article
    class="p-6 text-base rounded-lg dark:bg-gray-900"
    v-if="!!props.comment"
  >
    <footer class="flex justify-between items-center mb-2">
      <div class="flex items-center">
        <p
          class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
        >
          <img
            class="mr-2 w-6 h-6 rounded-full"
            :src="props.comment.profiles.avatar_url"
            alt="Michael Gough"
          />
          {{ props.comment.profiles.full_name }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <time pubdate datetime="2022-02-08" title="February 8th, 2022">
            {{ formatDate(props.comment?.created_at) }}
          </time>
        </p>
      </div>
      <div class="relative cursor-pointer" @click="menuIsOpen = !menuIsOpen">
        <button
          id="dropdownComment1Button"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path
              d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            />
          </svg>
          <span class="sr-only">Comment settings</span>
        </button>
        <!-- Dropdown menu -->
        <div
          class="z-10 w-36 bg-white absolute right-0 rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          :class="{ hidden: !menuIsOpen }"
        >
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li @click="removeComment">
              <a
                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Remove</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
      {{ props.comment?.content }}
    </p>
    <div class="flex items-center mt-4 space-x-4">
      <button
        @click="showForm = !showForm"
        type="button"
        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium mb-2"
      >
        <svg
          class="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
        Reply
      </button>
    </div>
    <CommentForm
      :table="props.table"
      :id="props.id"
      :parentId="props.comment.id"
      v-if="!!showForm"
    />
    <div v-if="!!sortedData">
      <Comment
        :comment="d"
        key="data.id"
        v-for="d in sortedData"
        :table="props.table"
        :id="props.id"
      />
    </div>
  </article>
</template>
<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
const showForm = ref(false);
const menuIsOpen = ref(false);
const client = useSupabaseClient();
  const { data } = await client
    .from(`${props.table}_comments`)
    .select(
      `id, content, created_at, profile_id: id, profiles (avatar_url, full_name )`,
    )
    .eq("parent_id", props.comment?.id);
const removeComment = async () => {
  await client
    .from(`${props.table}_comments`)
    .delete()
    .eq("id", props.comment.id);
  reloadNuxtApp();
};

const sortedData = data.sort((a, b) => {
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
console.log(data);
</script>
