<script setup lang="ts">
import type { ThreadSet } from "@/types/index.js"
import { useRouter } from "vue-router";
import { PhPencil, PhTrash } from "@phosphor-icons/vue";

const props = defineProps<{ threadSet: ThreadSet, editButton: boolean}>()
const router = useRouter()

function goToThreadSetPage() {
    router.push(`/threadset/${props.threadSet.id}`)
}
</script>

<template>
    <tr @click="goToThreadSetPage" >
        <td class="w-50">
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
                Threads: ?
            </div>
            <div>
                Responses: ?
            </div>
        </td>
        <td>
            <div>
                Last Thread by ?
            </div>
            <div>
                in: ?
            </div>
        </td>
        <td v-if="editButton" class="text-center">
            <button @click.stop="router.push(`/edit/threadset/${threadSet.id}`)" class="btn btn-primary ">
                <PhPencil />
            </button>
            <button @click.stop="$emit('handleRemove', threadSet.id, threadSet.name)" class="ms-2 btn btn-danger">
                <PhTrash />
            </button>
        </td>
    </tr>
</template>