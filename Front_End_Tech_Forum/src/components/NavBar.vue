<script setup>
import { RouterLink } from 'vue-router';
import router from '@/router';
import { PhUser, PhHouseSimple } from '@phosphor-icons/vue';
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" @click="router.push('/')">
                <img class="me-3 img-link" src="../assets/Icon_Tech_Forum.svg" alt="">
                <span class="lexend-font border-start ps-3 link">Tech Forum</span>
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

<style scoped>
.link {
    color: white;
    transition: color 0.2s;
    cursor: pointer;
}

.link:hover {
    color: rgb(213, 213, 213);
}

.img-link {
    transition: filter 0.4s;
    cursor: pointer;
}

.img-link:hover {
    filter: saturate(0);
}
</style>