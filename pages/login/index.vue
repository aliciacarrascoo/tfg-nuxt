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
    <button class="flex flex-row align-center bg-dark" @click="onLoginClick">
      <Icon name="uil:github" />
      {{ $t("Sign in with Github") }}
    </button>
  </div>
</template>
