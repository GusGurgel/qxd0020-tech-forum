<script setup lang="ts">
import ThreadSetEntry from './ThreadSetEntry.vue';
import type { ThreadSet, Thread } from "@/types/index.js"
import { useRouter } from 'vue-router';
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import { PhWarningOctagon, PhPlusCircle } from '@phosphor-icons/vue';
import { isAxiosError } from 'axios';
import { isApplicationError } from '@/composables/useApplicationError';
import type { ApplicationError } from '@/types';
import { useUserStore } from '@/stores/userStore';

const props = defineProps<{ editButtons: boolean }>();

const threadSets = ref([] as ThreadSet[])
const exception = ref<ApplicationError>()
const loading = ref(true)
const router = useRouter()
const userStore = useUserStore()

function handleError(e: any) {
  if (isAxiosError(e) && isApplicationError(e.response?.data)) {
    exception.value = e.response?.data
  }
}

async function handleRemove(idThreadSet: number, nameThreadSet: string) {
  try {
    exception.value = undefined
    loading.value = true
    const { data: childsThreadSets } = (await api.get('/threads', {
      params: {
        "filters[thread_set][id][$eq]": idThreadSet
      }
    })).data

    let messageComplemente = ""

    if (childsThreadSets.length > 0) {
      messageComplemente = `\n\nThis Thread Set has ${childsThreadSets.length} Threads that will be removed with this action.`
    }

    if (confirm(`Confirm thead "${nameThreadSet}" deletion.` + messageComplemente)) {
      for (const thread of childsThreadSets) {
        await api.delete(`/threads/${thread.id}`, {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        })
      }

      await api.delete(`/thread-sets/${idThreadSet}`, {
        headers: {
          Authorization: `Bearer ${userStore.jwt}`
        }
      })
      threadSets.value = threadSets.value.filter(val => val.id !== idThreadSet)
    }
  } catch (e) {
    handleError(e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    loading.value = true
    const { data } = await api.get("/thread-sets")
    const threadSetsData = data.data;

    for (const threadSetData of threadSetsData) {

      // Pegar dados das threads contidas no threadset
      const dataThreads = (await api.get('/threads', {
        params: {
          "filters[thread_set][id][$eq]": threadSetData.id,
          "populate": "author"
        }
      })).data

      // Pegar dados da última thread do threadset
      const dataLastThread = (await api.get('/threads', {
        params: {
          "filters[thread_set][id][$eq]": threadSetData.id,
          "populate": "author",
          "sort": "createdAt:desc",
          "pagination[limit]": 1 
        }
      })).data


      threadSets.value.push({
        id: threadSetData.id,
        name: threadSetData.attributes.name,
        description: threadSetData.attributes.description,
        threadCount: dataThreads.data.length,
        lastThread: dataLastThread.data.length > 0 ? dataLastThread.data[0] : null
      })
    }
  } catch (e) {
    handleError(e)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <button v-if="editButtons" @click="router.push('/create/threadset')"
    class="btn btn-outline-primary mb-2 w-100 text-center">
    <PhPlusCircle />
  </button>
  <div class="text-center text-white p-1 bg-secondary top-rounded font-monospace">
    Thread Sets
  </div>
  <div v-if="exception" class="alert alert-danger mt-2 d-flex align-items-center" role="alert">
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
  <table class="table table-hover">
    <tbody>
      <ThreadSetEntry v-for="threadSet in threadSets" :key="threadSet.id"
        :threadSet="{ ...threadSet }"
        :editButtons="props.editButtons" @handleRemove="handleRemove" />
    </tbody>
  </table>
</template>

<style scoped>
.vh-80 {
  height: 80vh;
}

.top-rounded {
  border-radius: 10px 10px 0 0;
}
</style>