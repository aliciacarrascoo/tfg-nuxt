<script setup>
import { watchEffect } from "vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    navigateTo("/");
  }
});

async function onLoginClick() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/confirm",
    },
  });
  console.error(data);
}
</script>

<template>
  <div class="w-100 flex flex-column">
    <button
      class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
      @click="onLoginClick"
    >
      <Icon name="uil:github" />
      {{ $t("Sign in with Github") }}
    </button>
  </div>
</template>
