<template>
  <!-- tailwind css card -->
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            A card
          </h3>
          <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
            A description
          </p>
        </div>
        <div class="mt-5 flex-shrink-0">
          <button @click="$emit('remove')" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
            <span class="ml-2">Remove</span>
          </button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "Row"
}
</script>

<style scoped>

</style>