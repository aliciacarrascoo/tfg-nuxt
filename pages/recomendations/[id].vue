<template>
  <Page title="Recomendations">
    <div class="flex flex-1 flex-row w-full h-full max-h-full overflow-hidden">
      <div class="basis-1/4 h-full mr-8">
        <div class="overflow-y-scroll max-h-full">
          <ul class="py-1 list-unstyled fw-normal small">
            <li class="mb-2 text-sm font-semibold tracking-wide text-blue-700 uppercase lg:text-xs dark:text-white">
              Other alert types
            </li>
            <li class="my-4 mr-4" v-for="recomendation in allRecomendations" key="recomendation.recomendation_id"> 
              <NuxtLink class="text-gray-500 cursor-pointer" :to="`/recomendations/${recomendation.recomendation_id}`">
              {{ recomendation.alert_name }}
              </NuxtLink>
            </li>
          </ul>
        </div> 
      </div>
      <div class="basis-3/4 overflow-auto">
        <h2 class="mb-3 text-4xl font-bold dark:text-white">{{ data.alert_name }}</h2>
<p class="text-gray-500 dark:text-gray-400 text-4sm">{{ data.abstract }}</p>
<hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
        <h4 class="font-semibold mb-3 text-xl font-bold dark:text-white">Recomendation</h4>
<p class="text-gray-1000 text-lg leading-relaxed text-justify dark:text-gray-400">{{ data.recomendation }}</p>
    <CommentSection table="recomendation" :id="route.params.id" />
      </div>
    </div>
  </Page>
</template>

<script setup>
const route = useRoute();
const client = useSupabaseClient();
const { data: allRecomendations} = await client.from("recomendations").select(); 
const { data } = await client.from("recomendations").select().eq("recomendation_id", route.params.id).single();
</script>
