<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const mobileMenuIsOpen = ref(false);
const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);

const logout = async () => {
  await client.auth.signOut();
  navigateTo("/login");
};
</script>

<template>
  <div class="h-screen flex flex-col">
    <header>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div
          class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
        >
          <NuxtLink to="/" class="flex items-center">
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
              >{{ getConfig("siteName") }}
            </span>
          </NuxtLink>
          <div class="flex items-center lg:order-2 klg:hidden">
            <button
              @click="mobileMenuIsOpen = !mobileMenuIsOpen"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
            :class="{ hidden: !mobileMenuIsOpen }"
          >
            <ul
              class="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:items-center lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700"
            >
              <li>
                <NuxtLink
                  to="/"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                  >Home</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/logs"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >Logs</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/resources"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >Recursos</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/databases"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >Databases</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/blog"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >Blog</NuxtLink
                >
              </li>
              <li v-if="user" class="flex items-center">
                <Button
                  buttonType="text"
                  @click="logout"
                  class="block py-2 pl-3 pr-2"
                >
                  {{ $t("Logout") }}
                </Button>
                <span class="text-gray-600">
                  {{ `(${user.email})` }}
                </span>
              </li>
              <li>
                <LanguageSelector />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div
      class="w-full bg-transparent rounded-full h-1.5 absolute top-[72px]"
      :class="{ invisible: !isLoading }"
    >
      <div
        :class="[isLoading ? 'w-11/12' : 'w-0']"
        class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 custom-transition"
      ></div>
    </div>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<style>
.h-40px {
  height: 40px;
}
.custom-transition {
  transition-property: width;
  transition-duration: 20000ms;
  transition-timing-function: cubic-bezier(0, 1.03, 0, 1);
}
</style>
