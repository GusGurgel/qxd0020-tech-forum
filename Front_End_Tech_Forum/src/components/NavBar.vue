<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { computed } from 'vue';
import { PhUser, PhHouseSimple } from '@phosphor-icons/vue';

const router = useRouter()
const currentRouteName = computed(() => router.currentRoute.value.name)
console.log("Route:", currentRouteName)
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img class="me-3" src="../assets/Icon_Tech_Forum.svg" alt="">
                <span class="lexend-font border-start ps-3">Tech Forum</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto nav-underline">
                    <li class="nav-item">
                        <RouterLink class="lexend-font nav-link" to="/">
                            Home
                            <PhHouseSimple weight="fill" />
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="lexend-font nav-link" to="/login">
                            Login
                            <PhUser weight="fill" />
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>