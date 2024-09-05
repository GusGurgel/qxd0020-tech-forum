<script setup lang="ts">
import type { ThreadSet } from "@/types/index.js"
import router from "@/router";

const props = defineProps<ThreadSet>()

function goToThreadSetPage() {
    router.push(`/threadset/${props.id}`)
}
</script>

<template>
    <tr @click="goToThreadSetPage">
        <td class="w-50">
            <div>
                <div class="text-primary h5">
                    {{ name }}
                </div>
                <div class="small">
                    {{ description }}
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
    </tr>
</template>