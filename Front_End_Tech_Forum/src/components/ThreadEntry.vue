<script setup lang="ts">
import type { Thread } from "@/types/index.js"

import { PhPencil, PhTrash } from "@phosphor-icons/vue";

import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { limitString } from "@/composables/useLimiteString";
import { useUserStore } from "@/stores/userStore";

const props = defineProps<{
  thread: Thread,
  editButtons: boolean
}>()
const router = useRouter()
const userStore = useUserStore()

const threadRoute = computed<string>(() => {
  if(userStore.isAuthenticated && userStore.role.toLocaleLowerCase() === "admin") {
    return `admin/thread/${props.thread.id}`
  }
  return `/thread/${props.thread.id}`
})

const lastResponseAuthor = ref<string>("")
const lastResponseCreateAt = ref<string>("")
const stringLimit = 35

if (props.thread.lastResponse) {
  const { lastResponse } = props.thread

  lastResponseAuthor.value = limitString(lastResponse.author.username, stringLimit)
  lastResponseCreateAt.value = new Date(lastResponse.createdAt).toLocaleDateString("en-US")
}

</script>

<template>
  <article @click="router.push(threadRoute)" class="row border-bottom gray-hover m-0 p-0">
    <div class="col-10 p-3" :class="{ 'col-lg-5': !editButtons, 'col-lg-4': editButtons }">
      <div class="text-primary h5">
        {{ thread.title }}
      </div>
      <div class="small">
        Create by <strong class="ubuntu-font">{{ thread.author.username }}</strong>
      </div>
    </div>
    <div class="d-none d-lg-block col-12 col-lg-2 p-3 text-center">
      {{ thread.reponsesCount }} Responses
    </div>
    <div class="d-none d-lg-block col-12 p-3 col-lg-5 text-center">
      <div v-if="lastResponseAuthor !== ''">
        <div>
          Author: <strong class="ubuntu-font">{{ lastResponseAuthor }}</strong>
        </div>
        <div>
          Date: <strong class="font-ubunut">{{ lastResponseCreateAt }}</strong>
        </div>
      </div>
      <div v-else class="text-center">
        <strong class="ubuntu-font">No Responses 😭</strong> 
      </div>
    </div>
    <div v-if="editButtons" class="text-center col-2 col-lg-1 d-flex align-items-center justify-content-center d-flex flex-column p-1">
      <button @click.stop="router.push(`/edit/thread/${thread.id}`)" class="btn btn-primary mb-2">
        <PhPencil />
      </button>
      <button @click.stop="$emit('handleRemove', thread.id, thread.title)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#remove-modal">
        <PhTrash />
      </button>
    </div>
  </article>
</template>

<style scoped>
.gray-hover:hover {
  background-color: #f0f0f0;
}
</style>