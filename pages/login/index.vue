<script setup>
import { watchEffect } from "vue";

const config = useRuntimeConfig();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const email = ref(undefined);
const password = ref(undefined);

watchEffect(() => {
  if (user.value) {
    navigateTo("/");
  }
});

async function onLoginClicked() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
}

async function onLoginOAuthClicked(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getUrl() + "confirm",
    },
  });
}
</script>

<template>
  <div class="w-100 h-full flex flex-column">
    <section
      class="p-5 w-full h-full flex flex-col justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div
        class="flex flex-col items-center md:justify-start justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              {{ `${$t("login.welcomeBackTo")} ${getConfig("siteName")}` }}
            </h1>
            <form
              class="space-y-4 md:space-y-6 flex flex-col align-items-center"
              action="#"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >{{ $t("login.yourEmail") }}</label
                >
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >{{ $t("login.password") }}</label
                >
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                      >{{ $t("login.rememberMe") }}</label
                    >
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >{{ $t("login.forgotPassword") }}</a
                >
              </div>
              <button
                @click="onLoginClicked"
                class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {{ $t("login.signIn") }}
              </button>
              <button
                class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mb-2"
                @click="() => onLoginOAuthClicked('github', runtimeConfig)"
              >
                <div class="flex items-center">
                  <Icon name="uil:github" class="mr-2" />
                  {{ $t("login.signInWithGithub") }}
                </div>
              </button>
              <button
                class="text-black bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mb-2"
                @click="() => onLoginOAuthClicked('google', runtimeConfig)"
              >
                <div class="flex items-center">
                  <Icon name="logos:google-icon" class="mr-2" />
                  {{ $t("login.signInWithGoogle") }}
                </div>
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                {{ $t("login.dontHaveAnAccountYet") }}
                <NuxtLink
                  to="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >{{ $t("login.signUp") }}</NuxtLink
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
