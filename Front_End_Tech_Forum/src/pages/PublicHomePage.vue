<script setup lang="ts">
import ThreadSetContainer from '@/components/ThreadSetContainer.vue';
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import type { ThreadSet } from '@/types';

const ThreadSets = ref([] as ThreadSet[])
const error = ref<Error>()
const loading = ref(true)

console.log(ThreadSets.value)

onMounted(async () => {
  try {
    const { data } = await api.get("/thread-sets")
    const threadData = data.data;

    for (const thread of threadData) {
      ThreadSets.value.push({
        id: thread.id,
        name: thread.attributes.name,
        description: thread.attributes.description,
      })
    }

    console.log(ThreadSets.value)
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <div v-if="error" class="alert alert-danger" role="alert">
      Error trying to fetch threads set
    </div>
    <div v-if="loading" class="vh-80 d-flex justify-content-center align-items-center">
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <ThreadSetContainer :threadSets="ThreadSets" />
  </main>
</template>


<style scoped>
.vh-80 {
  height: 80vh;
}
</style>