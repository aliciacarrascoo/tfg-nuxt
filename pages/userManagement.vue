<template>
  <Page title="Users"> 
    <div class="flex justify-end mb-3">
      <Button styles="bg-green-700 hover:bg-green-900 px-2 py-1.7 text-xs">
        <NuxtLink to="/userManagement/create">Create new user</NuxtLink>
      </Button> 
    </div>
    <Table />
  </Page>
</template>
