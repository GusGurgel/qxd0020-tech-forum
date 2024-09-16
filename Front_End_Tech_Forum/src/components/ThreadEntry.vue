<script setup lang="ts">
import type { Thread } from "@/types/index.js"
import { useRouter } from "vue-router";


const router = useRouter()
const props = defineProps<Thread>()

function goToThreadPage() {
    router.push(`/thread/${props.id}`)
}
</script>

<template>
    <tr>
        <td @click="goToThreadPage" class="w-50">
            <div>
                <div class="text-primary h5">
                    {{ title }}
                </div>
            </div>
        </td>
        <td>
            <div>
                Responses: ?
            </div>
            <div>
                Last Response By: ?
            </div>
        </td>
        <td>
            <div>
                Author: {{ author.username }}
            </div>
            <div>
                Created: {{ `${createdAt.getFullYear()}/${createdAt.getMonth()+1}/${createdAt.getDate()}` }}
            </div>
        </td>
    </tr>
</template>