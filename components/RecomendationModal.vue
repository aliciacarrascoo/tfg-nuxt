<script setup>
  import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

  const props = defineProps({
  title: {
    type: String,
  },
  abstract: {
    type: String,
  },
  text: {
    type: String,
  },
  id: {
    type: String,
  },
    isOpen: {
    type: Boolean,
    default: false,
  },
  setIsOpen: {
    type: Function,
    default: () => {},
  },
});

function closeModal() {
  props.setIsOpen(false);
}

</script>

<template>
    <Dialog @close="closeModal" class="relative z-10" :open="props?.isOpen">
      <div class="fixed inset-0 bg-black/25" />
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
          <Recomendation :title="props.title" :abstract="props.abstract" :text="props.text"/>
            <div class="mt-4">
              <p class="text-sm font-light text-blue-500 dark:text-gray-400">
                <NuxtLink
                  :to="`/recomendations/${props.id}`"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >See recomendation</NuxtLink
                >
              </p>
            </div>
        </DialogPanel>
        </div>
      </div>
    </Dialog>
</template>

