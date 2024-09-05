<script setup lang="ts">
import ThreadEntry from '@/components/ThreadEntry.vue';
import type { Thread } from "@/types/index.js"

const threadData: Thread[] = [
    {
        id: 1,
        title: "How to make Minecraft",
        createAt: new Date(0),
        author: {
            name: "Gustavo"
        }
    },
    {
        id: 2,
        title: "Resolving clang bugs",
        createAt: new Date(0),
        author: {
            name: "Pedro"
        }
    },
]
</script>

<template>
    <table class="table table-hover shadow">
        <tbody>
            <ThreadEntry v-for="thread in threadData" :key="thread.id" :id="thread.id" :title="thread.title"
                :author="thread.author" :createAt="thread.createAt" />
        </tbody>
    </table>
</template>