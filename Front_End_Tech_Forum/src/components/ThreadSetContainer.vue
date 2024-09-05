<script setup lang="ts">
import ThreadSetEntry from './ThreadSetEntry.vue';
import type { ThreadSet } from "@/types/index.js"

const props = defineProps<{threadSets: ThreadSet[]}>();
</script>

<template>
    <table class="table table-hover shadow">
        <tbody>
            <ThreadSetEntry v-for="threadSet in threadSets" :key="threadSet.id" :id="threadSet.id" :name="threadSet.name"
                :description="threadSet.description" />
        </tbody>
    </table>
</template>