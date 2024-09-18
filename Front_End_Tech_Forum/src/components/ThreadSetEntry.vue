<script setup lang="ts">
import type { ThreadSet } from "@/types/index.js"
import { useRouter } from "vue-router";
import { PhPencil } from "@phosphor-icons/vue";

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
        <td class="text-center">
            <button @click.stop="router.push(`/form/threadset?edit=${threadSet.id}`)" class="btn btn-primary ">
                <PhPencil />
            </button>
        </td>
    </tr>
</template>