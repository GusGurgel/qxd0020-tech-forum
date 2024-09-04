<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img class="me-3 display-2" src="../assets/Icon_Tech_Forum.svg" alt="">
                <span class="lexend">Tech Forum</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/"> Home </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/home1"> Home1 </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/home2"> Home2 </RouterLink>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
</template>

<style scoped>
.lexend {
    font-family: 'Lexend Deca ExtraLight';
}
</style>