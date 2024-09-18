<script setup lang="ts">
import ThreadSetContainer from '@/components/ThreadSetContainer.vue';
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import type { ThreadSet } from '@/types';
import { PhWarningOctagon, PhPlusCircle } from '@phosphor-icons/vue';
import { useRouter } from 'vue-router';

const ThreadSets = ref([] as ThreadSet[])
const error = ref<Error>()
const loading = ref(true)
const router = useRouter()

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
    <button @click="router.push('/form/threadset')" class="btn btn-outline-primary mt-2 mb-2 w-100 text-center">
      <PhPlusCircle />
    </button>
    <div class="text-center text-white p-1 bg-secondary top-rounded font-monospace">
        Thread Sets
    </div>
    <div v-if="error" class="alert alert-danger mt-2 d-flex align-items-center" role="alert">
      <PhWarningOctagon :size="32" />
      <div class="ms-3">
        Error trying to fetch <strong>Threads Set</strong>
      </div>
    </div>
    <div v-if="loading" class="vh-80 d-flex justify-content-center align-items-center">
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <ThreadSetContainer :threadSets="ThreadSets" :editButton="true" />
  </main>
</template>


<style scoped>
.vh-80 {
  height: 80vh;
}

.top-rounded {
  border-radius: 10px 10px 0 0;
}
</style>