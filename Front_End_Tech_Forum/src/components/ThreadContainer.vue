<script setup lang="ts">
import type { ThreadSet, ApplicationError, Thread, Response } from "@/types/index.js"

import BootstrapModal from '@/components/BootstrapModal.vue';
import ThreadEntry from './ThreadEntry.vue'
import { PhWarningOctagon, PhPlus, PhTrash } from '@phosphor-icons/vue';

import { useRouter, useRoute } from 'vue-router';
import { api } from '@/api';
import { onMounted, ref } from 'vue';
import { isAxiosError } from 'axios';
import { isApplicationError } from '@/composables/useApplicationError';
import { useUserStore } from '@/stores/userStore';

const props = defineProps<{ editButtons: boolean }>();

const threads = ref<Thread[]>([] as Thread[])
const threadSet = ref<Pick<ThreadSet, "name">>()

// const bodyTextRemoveModal = ref<string>('')
// const bodyComplementeTextRemoveModal = ref<string>('')
// const toRemoveNameThreadSet = ref<string>('')
// const toRemoveIdThreadSet = ref<number>()

const exception = ref<ApplicationError>()
const loading = ref(true)
const router = useRouter()
const route = useRoute()

const idThreadSet = route.params.id

const userStore = useUserStore()

function handleError(e: any) {
  if (isAxiosError(e) && isApplicationError(e.response?.data)) {
    exception.value = e.response?.data
  }
}

// async function removeThreadSet() {
//     const { data: childsThreadSets } = (await api.get('/threads', {
//       params: {
//         "filters[thread_set][id][$eq]": toRemoveIdThreadSet.value
//       }
//     })).data

//     for (const thread of childsThreadSets) {
//       await api.delete(`/threads/${thread.id}`, {
//         headers: {
//           Authorization: `Bearer ${userStore.jwt}`
//         }
//       })
//     }

//     await api.delete(`/thread-sets/${toRemoveIdThreadSet.value}`, {
//       headers: {
//         Authorization: `Bearer ${userStore.jwt}`
//       }
//     })
//     threadSets.value = threadSets.value.filter(val => val.id !== toRemoveIdThreadSet.value)
// }

// async function handleRemove(idThreadSet: number, nameThreadSet: string) {
//   try {
//     exception.value = undefined
//     loading.value = true
//     toRemoveIdThreadSet.value = idThreadSet
//     toRemoveNameThreadSet.value = nameThreadSet

//     const { data: childsThreadSets } = (await api.get('/threads', {
//       params: {
//         "filters[thread_set][id][$eq]": idThreadSet
//       }
//     })).data

//     let messageComplemente = ""

//     if (childsThreadSets.length > 0) {
//       messageComplemente = `\n\nThis Thread Set has ${childsThreadSets.length} Threads that will be removed with this action.`
//     }

//     bodyTextRemoveModal.value = `Confirm Thread Set "${toRemoveNameThreadSet.value}" deletion`;
//     bodyComplementeTextRemoveModal.value = messageComplemente;
//   } catch (e) {
//     handleError(e)
//   } finally {
//     loading.value = false
//   }
// }

onMounted(async () => {
  try {
    loading.value = true
    const { data: threadSetData } = (await api.get(`/thread-sets/${idThreadSet}`)).data
    const { data: threadsData } = (await api.get(`/threads/`, {
      params: {
        "filters[thread_set][id][$eq]": idThreadSet,
        "populate": "author",
        "sort": ["isFixed:desc", "createdAt:desc"] 
      }
    })).data

    threadSet.value = {
      name: threadSetData.name
    }

    for (const threadData of threadsData) {
      // Pegar dados das reponses contidas na thread
      const { data: reponsesData } = (await api.get('/responses', {
        params: {
          "filters[thread][id][$eq]": threadData.id,
        }
      })).data

      // Pegar dados da última thread do threadset
      const { data: lastResponseData } = (await api.get('/responses', {
        params: {
          "filters[thread][id][$eq]": threadData.id,
          "populate": "author",
          "sort": "createdAt:desc",
          "pagination[limit]": 1
        }
      })).data

      let lastResponse : Response | null = null

      if(lastResponseData.length > 0) {
        lastResponseData[0].createdAt = new Date(lastResponseData[0].createdAt)
        lastResponse = lastResponseData[0]
      }

      threads.value.push({
        id: threadData.id,
        title: threadData.title,
        createdAt: new Date(threadData.createdAt),
        isFixed: threadData.isFixed,
        reponsesCount: reponsesData.length,
        lastResponse,
        author: {
          username: threadData.author.username
        }
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
  <!--   
  <BootstrapModal :idModal="'remove-modal'" :labelModal="'modal'">
    <template v-slot:header>
      <h1 class="modal-title fs-5">Remove <strong>ThreadSet</strong> <PhTrash /> </h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>
<template v-slot:body>
      {{ bodyTextRemoveModal }}
      <div class="fw-bold mt-3">
        {{ bodyComplementeTextRemoveModal }}
      </div>
    </template>
<template v-slot:footer>
      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="removeThreadSet">Confirm</button>
    </template>
</BootstrapModal>
-->
  <div v-if="exception" class="alert alert-danger mt-2 d-flex align-items-center" role="alert">
    <PhWarningOctagon :size="32" />
    <div class="ms-3">
      Error trying to fetch <strong>Threads</strong>
    </div>
  </div>
  <div v-if="loading" class="vh-80 d-flex justify-content-center align-items-center">
    <div class="spinner-border text-dark" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  <div class="text-center p-2 bg-dark text-light shadow mt-3">
    {{ threadSet?.name }}
  </div>
  <main class="bg-light-subtle shadow row m-0 mt-3">
    <div class="shadow col-10 bg-dark text-light p-0 py-2 text-center"
      :class="{ 'col-lg-4': editButtons, 'col-lg-5': !editButtons }">
      Title
    </div>
    <div class="shadow d-none d-lg-block col-2 bg-dark text-light p-0 py-2 text-center">
      Thread Responses
    </div>
    <div class="shadow d-none d-lg-block bg-dark text-light p-0 py-2 text-center col-lg-5">
      Last Response
    </div>
    <button v-if="editButtons" @click="router.push('/create/threadset')"
      class="btn btn-dark rounded-0 text-center col-2 col-lg-1 shadow">
      <PhPlus :size="20" />
    </button>
    <ThreadEntry v-for="thread in threads" :key="thread.id" :thread="{...thread}" :editButtons="props.editButtons" />
  </main>
</template>