<script setup lang="ts">
import ThreadContainer from '@/components/ThreadContainer.vue';
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import type { Thread, ThreadSet } from '@/types';
import { useRoute } from 'vue-router';
import { PhWarningOctagon } from '@phosphor-icons/vue';

const Threads = ref([] as Thread[])
const ThreadSetData = ref({} as ThreadSet)
const error = ref<Error>()
const loading = ref(true)
const route = useRoute()
const idThreadSet = Number(route.params.id)

onMounted(async () => {
  try {
    const dataThreadSet = (await api.get(`/thread-sets/${idThreadSet}`)).data
    const dataThread = (await api.get('/threads', {
      params: {
        "filters[thread_set][id][$eq]": idThreadSet
      }
    })).data

    const threadSetData = dataThreadSet.data;
    const threadsData = dataThread.data;
    ThreadSetData.value = {
      id: threadSetData.id,
      name: threadSetData.attributes.name,
      description: threadSetData.attributes.description
    }

    for (const thread of threadsData) {
      Threads.value.push({
        id: thread.id,
        title: thread.attributes.title,
        isFixed: thread.attributes.isFixed,
        createdAt: new Date(thread.attributes.createdAt),
        author: {
          id: 1,
          username: "Gurgel Temporário",
          role: { name: "blabla" },
          email: "bal@gmail.com",
          image: { url: "?" }
        }
      })
    }
  } catch (e) {
    console.log(e)
    error.value = e as Error
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <div class="text-center text-white p-1 mt-2 bg-secondary font-monospace top-rounded">
      {{  ThreadSetData.name }}
    </div>
    <div v-if="error" class="alert alert-danger mt-2 d-flex align-items-center" role="alert">
      <PhWarningOctagon :size="32" />
      <div class="ms-3">
        Error trying to fetch ThreadSet with <strong>id = {{ idThreadSet }}</strong>
      </div>
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

.top-rounded {
  border-radius: 10px 10px 0 0;
}
</style>