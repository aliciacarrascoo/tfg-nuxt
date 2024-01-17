<template>
  <Page title="Recomendations">
    <div class="flex flex-1 flex-row w-full h-full max-h-full overflow-hidden">
      <div class="basis-1/4 h-full mr-8">
        <div class="overflow-y-scroll max-h-full">
          <ul class="py-1 list-unstyled fw-normal small">
            <li class="mb-2 text-sm font-semibold tracking-wide text-blue-700 uppercase lg:text-xs dark:text-white">
              Other alert types
            </li>
            <li class="my-4 mr-4" v-for="recomendation in allRecomendations" :key="recomendation.recomendation_id"> 
              <NuxtLink class="text-gray-500 cursor-pointer" :to="`/recomendations/${recomendation.recomendation_id}`">
              {{ recomendation.alert_name }}
              </NuxtLink>
            </li>
          </ul>
        </div> 
      </div>
      <div class="basis-3/4 overflow-auto p-4">
        <div class="flex flex-row items-center justify-between">
          <h2 v-if="!isEditing" class="mb-3 text-4xl max-w-[70%] truncate font-bold dark:text-white">{{ alertNameInput}} </h2>  
          <textarea rows="1" class="w-50 mb-3 rounded-md text-4xl" v-if="isEditing" v-model="alertNameInput" />
            <div class="ml-2 flex items-center" :class="{'opacity-50': currentUserProfile?.role !== 'admin'}">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="isEditing" class="sr-only peer" :disabled="currentUserProfile?.role === 'admin' === 1"/>
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm">Admin mode</span>
          </label>
          <Button
          @click="onSaveRecomendation"
          :disabled="currentUserProfile?.role === 'admin' === 1"
          styles="bg-green-700 hover:bg-green-900 m-0 px-2 py-1.7 ml-4 text-xs"
          >
          Save edits
        </Button>
          </div>
        </div>
        <p v-if="!isEditing" class="text-gray-500 dark:text-gray-400 text-4sm">{{ abstractInput }}</p>
        <textarea rows="3" class="w-full rounded-md" v-if="isEditing" v-model="abstractInput" />
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
        <div>
          <h4 class="font-semibold mb-3 text-xl font-bold dark:text-white">Recomendation</h4>
        </div>
        <p v-if="!isEditing" class="text-gray-1000 text-lg leading-relaxed text-justify dark:text-gray-400">{{ recomendationInput }}</p>
        <textarea rows="40" class="w-full" v-if="isEditing" v-model="recomendationInput" />
        <CommentSection table="recomendation" :id="route.params.id" />
      </div>
    </div>
  </Page>
</template>

<script setup>
const route = useRoute();
const isEditing = ref(false);
const client = useSupabaseClient();
const currentUserProfile = await useCurrentUserProfile();
console.log(currentUserProfile);
const alertStore = useAlertStore();

const { data: allRecomendations} = await client.from("recomendations").select(); 
const { data } = await client.from("recomendations").select().eq("recomendation_id", route.params.id).single();
const recomendationInput = ref(data.recomendation);
const abstractInput = ref(data.abstract);
const alertNameInput = ref(data.alert_name);
const newRecomendationObject = ref(data);

watch([recomendationInput, abstractInput,alertNameInput], ([newRecomendation, newAbstractInput, newAlertName]) => {
 newRecomendationObject.value = {...newRecomendationObject.value, recomendation: newRecomendation.value, abstract: newAbstractInput.value, alert_name: newAlertName.value}; 
 console.log(newRecomendationObject);
})

const onSaveRecomendation = async () => {
  console.log(newRecomendationObject);
  const { error } = await client
    .from("recomendations")
    .update(newRecomendationObject.value)
    .eq("recomendation_id", route.params.id);
  error && alertStore.addTemporaryAlert(error, undefined, "danger"); 
  !error && alertStore.addTemporaryAlert("Changes saved", "Saved!", "success");
}

</script>
