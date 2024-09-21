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

if(props.threadSet.lastThread) {
  const { lastThread } = props.threadSet
  console.log(lastThread)

  lastThreadTitle.value = lastThread.attributes.title
  lastThreadAuthor.value = limitString(lastThread.attributes.author.data.attributes.username, 20)
  lastThreadCreateAt.value = new Date(lastThread.attributes.createdAt).toLocaleDateString("en-US")
}

function goToThreadSetPage() {
  router.push(`/threadset/${props.threadSet.id}`)
}

</script>

<template>
  <tr @click="goToThreadSetPage">
    <td>
      <div>
        <div class="text-primary h5">
          {{ threadSet.name }}
        </div>
        <div class="small">
          {{ threadSet.description }}
        </div>
      </div>
    </td>
    <td>
      <div>
        {{ threadSet.threadCount }} Threads
      </div>
    </td>
    <td>
      <div v-if="lastThreadTitle !== ''">
        <div>
          Title: <strong>{{ lastThreadTitle }}</strong>
        </div>
        <div>
          Author: <strong>{{ lastThreadAuthor }}</strong>
        </div>
        <div>
          Date: <strong>{{ lastThreadCreateAt }}</strong>
        </div>
      </div>
    </td>
    <td v-if="editButtons" class="text-center">
      <button @click.stop="router.push(`/edit/threadset/${threadSet.id}`)" class="btn btn-primary ">
        <PhPencil />
      </button>
      <button @click.stop="$emit('handleRemove', threadSet.id, threadSet.name)" class="ms-2 btn btn-danger">
        <PhTrash />
      </button>
    </td>
  </tr>
</template>