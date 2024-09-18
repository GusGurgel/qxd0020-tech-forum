<script setup lang="ts">
import ThreadSetEntry from './ThreadSetEntry.vue';
import type { ThreadSet } from "@/types/index.js"

const props = defineProps<{threadSets: ThreadSet[], editButton: boolean}>();
</script>

<template>
    <table class="table table-hover">
        <tbody>
            <ThreadSetEntry v-for="threadSet in threadSets" :key="threadSet.id" :threadSet="{id: threadSet.id, name:threadSet.name, description: threadSet.description }" 
                :editButton="editButton"/>
        </tbody>
    </table>
</template>