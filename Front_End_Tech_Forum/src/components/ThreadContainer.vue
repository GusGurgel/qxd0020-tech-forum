<script setup lang="ts">
import type { ApplicationError } from '@/types';
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import type { Thread } from '@/types';
import { isApplicationError } from '@/composables/useApplicationError';
import { isAxiosError } from 'axios';
import ThreadEntry from "@/components/ThreadEntry.vue"
import { useUserStore } from '@/stores/userStore';
import { limitString } from '@/composables/useLimiteString';

const props = defineProps<{ idThreadSet: number }>()

const Threads = ref([] as Thread[])
const exception = ref<ApplicationError>()
const loading = ref(true)
const userStore = useUserStore()

onMounted(async () => {
  try {
    const dataThreads = (await api.get('/threads', {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      },
      params: {
        "populate": "author",
        "sort": ["isFixed:desc", "createdAt:desc"] 
      }
    })).data

    const threadsData = dataThreads.data;
    console.log(threadsData)

    for (const thread of threadsData) {
      const author = thread.attributes.author.data

      Threads.value.push({
        id: thread.id,
        title: thread.attributes.title,
        isFixed: thread.attributes.isFixed,
        createdAt: new Date(thread.attributes.createdAt),
        author: {
          username: limitString(author.attributes.username, 25),
        }
      })
    }

  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      exception.value = e.response?.data
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <table class="table table-hover shadow">
    <tbody>
      <ThreadEntry v-for="thread in Threads" :key="thread.id" :id="thread.id" :title="thread.title"
        :author="thread.author" :isFixed="thread.isFixed" :createdAt="thread.createdAt" />
    </tbody>
  </table>
</template>