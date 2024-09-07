<script setup lang="ts">
import ThreadEntry from '@/components/ThreadEntry.vue';
import type { Thread } from "@/types/index.js"
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)

const Threads = ref([] as Thread[])
// const error = ref<Error>()
// const loading = ref(true)

// console.log(ThreadSets.value)

// onMounted(async () => {
//   try {
//     const { data } = await api.get("/thread-sets")
//     const threadData = data.data;

//     for (const thread of threadData) {
//       ThreadSets.value.push({
//         id: thread.id,
//         name: thread.attributes.name,
//         description: thread.attributes.description,
//       })
//     }

//     console.log(ThreadSets.value)
//   } catch (e) {
//     error.value = e as Error
//   } finally {
//     loading.value = false
//   }
// })
</script>

<template>
 Thread: {{ id }}
</template>