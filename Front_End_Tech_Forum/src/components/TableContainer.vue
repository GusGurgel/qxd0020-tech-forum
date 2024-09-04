<script setup lang="ts">
import SetEntry from './SetEntry.vue';
import type { ThreadSet } from "@/types/index.js"

const threadSetsData: ThreadSet[] = [
    {
        id: 1,
        name: "General Discurssions",
        description: "For talk anything"
    },
    {
        id: 2,
        name: "C++ Programing",
        description: "The best lang in the world"
    }
]
</script>

<template>
    <table class="table table-hover shadow">
        <tbody>
            <SetEntry v-for="threadSet in threadSetsData" :key="threadSet.id" :id="threadSet.id" :name="threadSet.name"
                :description="threadSet.description" />
        </tbody>
    </table>
</template>