<script setup lang="ts">
import type { Response } from "@/types/index.js"

import { PhPencil, PhTrash, PhPushPin } from "@phosphor-icons/vue";

import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { limitString } from "@/composables/useLimiteString";
import { useUserStore } from "@/stores/userStore";
import { formatDate } from "@/composables/useFormatDate";
import { useUploadFile } from "@/composables/useUploadURL";

const props = defineProps<{
  response: Response,
  editButtons: boolean
}>()
const router = useRouter()

const userImage = computed(() => {
    if (props.response.author?.image) {
        return useUploadFile(props.response.author.image)
    } else {
        return '../../public/Logo_Tech_Forum.svg'
    }
})


</script>

<template>
  <article class="row border-bottom m-0 p-0">
    <div class="col-12 p-0 col-lg-3">
      <div class="small text-center bg-secondary text-light">
      </div>
      <div class="d-flex align-items-center justify-content-center p-2">
        <img class="d-block img-size rounded" :src="userImage" alt='user image'>
      </div>
      <div class="text-center">
        <div>
          {{ response.author.username }}
        </div>
        <div class="small-text">
          In <strong class="ubuntu-font">{{ formatDate(response.createdAt) }}</strong>
        </div>
      </div>
    </div>
    <hr class="d-block d-lg-none mt-3">
    <div class="col-12 p-0 text-center" :class="
      editButtons ? 'col-lg-8' : 'col-lg-9'
    ">
      {{ response.content }}
    </div>
    <div v-if="editButtons" class="text-center col-2 col-lg-1 d-flex align-items-center justify-content-center d-flex flex-column p-1">
      <button @click.stop="$emit('handleRemove', response.id, response.author.username)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#remove-modal">
        <PhTrash />
      </button>
    </div>
  </article>
</template>

<style scoped>
.img-size {
  width: 200px;
  height: 200px; 
}
</style>