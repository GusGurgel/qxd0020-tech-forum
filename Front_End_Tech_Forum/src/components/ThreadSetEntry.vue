<script setup lang="ts">
import type { ThreadSet } from "@/types/index.js"
import { useRouter } from "vue-router";
import { PhPencil, PhTrash } from "@phosphor-icons/vue";
import { ref } from "vue";
import { limitString } from "@/composables/useLimiteString";

const props = defineProps<{
  threadSet: ThreadSet,
  editButtons: boolean
}>()
const router = useRouter()

const lastThreadTitle = ref<string>("")
const lastThreadAuthor = ref<string>("")
const lastThreadCreateAt = ref<string>("")
const stringLimit = 35

if (props.threadSet.lastThread) {
  const { lastThread } = props.threadSet
  console.log(lastThread)

  lastThreadTitle.value = limitString(lastThread.attributes.title, stringLimit)
  lastThreadAuthor.value = limitString(lastThread.attributes.author.data.attributes.username, stringLimit)
  lastThreadCreateAt.value = new Date(lastThread.attributes.createdAt).toLocaleDateString("en-US")
}

</script>

<template>
  <article @click="router.push(`/threadset/${threadSet.id}`)" class="row border-bottom gray-hover m-0 p-0">
    <div class="col-10 p-3" :class="{ 'col-lg-5': !editButtons, 'col-lg-4': editButtons }">
      <div class="text-primary h5">
        {{ threadSet.name }}
      </div>
      <div class="small">
        {{ threadSet.description }}
      </div>
    </div>
    <div class="d-none d-lg-block col-12 col-lg-2 p-3 text-center">
      {{ threadSet.threadCount }} Threads
    </div>
    <div class="d-none d-lg-block col-12 p-3 col-lg-5">
      <div v-if="lastThreadTitle !== ''">
        <div>
          Title: <strong class="ubuntu-font">{{ lastThreadTitle }}</strong>
        </div>
        <div>
          Author: <strong class="ubuntu-font">{{ lastThreadAuthor }}</strong>
        </div>
        <div>
          Date: <strong class="font-ubunut">{{ lastThreadCreateAt }}</strong>
        </div>
      </div>
      <div v-else>
        <strong class="ubuntu-font">No threads 😭</strong> 
      </div>
    </div>
    <div v-if="editButtons" class="text-center col-2 col-lg-1 d-flex align-items-center justify-content-center d-flex flex-column p-1">
      <button @click.stop="router.push(`/edit/threadset/${threadSet.id}`)" class="btn btn-primary mb-2">
        <PhPencil />
      </button>
      <button @click.stop="$emit('handleRemove', threadSet.id, threadSet.name)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#remove-modal">
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