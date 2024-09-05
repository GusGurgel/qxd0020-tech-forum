<script setup lang="ts">
import type { Thread } from "@/types/index.js"
import router from "@/router";

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
                Author: {{ author.name }}
            </div>
            <div>
                Created: {{ `${createAt.getFullYear()}/${createAt.getMonth()+1}/${createAt.getDay()}` }}
            </div>
        </td>
    </tr>
</template>