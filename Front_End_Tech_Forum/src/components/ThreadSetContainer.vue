<script setup lang="ts">
import ThreadSetEntry from './ThreadSetEntry.vue';
import type { ThreadSet } from "@/types/index.js"
import { useRouter } from 'vue-router';
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import { PhWarningOctagon, PhPlus } from '@phosphor-icons/vue';
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
  <main class="bg-light-subtle shadow row top-rounded mt-3">
    <div class="shadow col-12 col-lg-4 bg-dark text-light top-left-rounded p-2 text-center">
      Name
    </div>
    <div class="shadow d-none d-lg-block col-2 bg-dark text-light p-2 text-center">
      Threads Created
    </div>
    <div class="shadow d-none d-lg-block bg-dark text-light p-2 text-center" :class="{ 'col-5': editButtons, 'col-6': !editButtons }">
      Last Thread
    </div>
    <button v-if="editButtons" @click="router.push('/create/threadset')"
      class="btn btn-dark rounded-0 top-right-rounded text-center col-1 shadow">
      <PhPlus :size="20" />
    </button>
    <ThreadSetEntry v-for="threadSet in threadSets" :key="threadSet.id"
      :threadSet="{ ...threadSet }"
      :editButtons="props.editButtons" @handleRemove="handleRemove" />
  </main>
</template>

<style scoped>
.vh-80 {
  height: 80vh;
}

.top-left-rounded {
  border-top-left-radius: 10px;
}

.top-right-rounded {
  border-top-right-radius: 10px !important;
}

.top-rounded {
  border-radius: 10px 10px 0 0;
}
</style>