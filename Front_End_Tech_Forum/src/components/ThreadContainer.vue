<script setup lang="ts">
import type { Thread } from "@/types/index.js"
import ThreadEntry from '@/components/ThreadEntry.vue';

const props = defineProps<{threads: Thread[]}>()
</script>

<template>
    <table class="table table-hover shadow">
        <tbody>
            <ThreadEntry v-for="thread in threads" :key="thread.id" :id="thread.id" :title="thread.title"
                :author="thread.author" :isFixed="thread.isFixed" :createdAt="thread.createdAt" />
        </tbody>
    </table>
</template>