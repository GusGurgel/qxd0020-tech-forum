<script setup lang="ts">
import ThreadContainer from '@/components/ThreadContainer.vue';
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import type { Thread } from '@/types';
import { useRoute } from 'vue-router';

const Threads = ref([] as Thread[])
const error = ref<Error>()
const loading = ref(true)
const route = useRoute()
const idThreadSet = Number(route.params.id)

onMounted(async () => {
  try {
    const { data } = await api.get(`/threads?filters[thread_set][id][$eq]=${idThreadSet}`)
    const threadData = data.data;

    for (const thread of threadData) {
      Threads.value.push({
        id: thread.id,
        title: thread.attributes.title,
        isFixed: thread.attributes.isFixed,
        createdAt: new Date(thread.attributes.createdAt),
        author: {
            name: "Gurgel Temporário"
        }
      })
    }
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
      Error trying to fetch threads
    </div>
    <div v-if="loading" class="vh-80 d-flex justify-content-center align-items-center">
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <ThreadContainer :threads="Threads" />
  </main>
</template>


<style scoped>
.vh-80 {
  height: 80vh;
}
</style>