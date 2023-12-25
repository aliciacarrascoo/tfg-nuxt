<template>
    <template>
  <div class="fixed inset-0 flex items-center justify-center">
    <button
      type="button"
      @click="openModal"
      class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      Open dialog
    </button>
  </div>

    <Dialog  @close="closeModal" class="relative z-10" :open="props.isOpen">

        <div class="fixed inset-0 bg-black/25" />
  

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >

            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Adding user to organization
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Introduce the <strong>email</strong> of the user you want to invite to your organization
                </p>
              </div>
              <input
              class="block w-full p-2 my-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  :value="email"
  @input="event => email = event.target.value">
              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="sendEmail"
                >
                  Send email!
                </button>
              </div>
            </DialogPanel>

        </div>
      </div>
    </Dialog>

</template>
  </template>
  
  <script setup>
    import {
      Dialog,
      DialogPanel,
      DialogTitle,
    } from '@headlessui/vue'
    
    const props = defineProps({
      isOpen: {
        type: Boolean,
        default: false
      },
      setIsOpen: {
        type: Function,
        default: () => {}
      }
    });
    const loadingStore = useLoadingStore();
    const email = ref('');
    function closeModal() {
      props.setIsOpen(false);
    }

    function openModal() {
      props.setIsOpen(true);
    }

    async function sendEmail() {
      loadingStore.setLoading(true)
      const result = await $fetch('api/send', { method: 'POST', body: { email: email.value} })
      loadingStore.setLoading(false)
      closeModal();
      console.error(result)
    }
  </script>