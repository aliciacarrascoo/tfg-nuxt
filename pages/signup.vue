<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const fullName = ref(undefined);
const email = ref(undefined);
const password = ref(undefined);
const passwordConfirmation = ref(undefined);
const alertStore = useAlertStore();

const signUpNewUser = () => {
  if (password.value !== passwordConfirmation.value) return;
  const { data, error } = supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: { full_name: fullName.value },
    },
  });
  if (error) {
    alertStore.addTemporaryAlert(error.value, 'Sign up error', 'danger');
  }else{
    alertStore.addTemporaryAlert("Confirm your mail to be able to login", "Success", "success");
    navigateTo("/login");
  }
};
</script>
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create an account
          </h1>
          <div>
            <label
              for="fullName"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your full name</label
            >
            <input
              v-model="fullName"
              type="fullName"
              name="fullName"
              id="fullName"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              required=""
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
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
              >Password</label
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
          <div>
            <label
              for="confirm-password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Confirm password</label
            >
            <input
              v-model="passwordConfirmation"
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              />
            </div>
            <div class="ml-3 text-sm">
              <label
                for="terms"
                class="font-light text-gray-500 dark:text-gray-300"
                >I accept the
                <a
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                  >Terms and Conditions</a
                ></label
              >
            </div>
          </div>

          <Button @click="signUpNewUser">Create an account</Button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <NuxtLink
                to="/login"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Login here</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
