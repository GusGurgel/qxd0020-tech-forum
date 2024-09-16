<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { PhIdentificationBadge, PhUser } from '@phosphor-icons/vue';
import { PhIdentificationCard } from '@phosphor-icons/vue';

const userStore = useUserStore()
</script>

<template>
    <div class="row mt-3 p-3 p-xl-0">
        <div class="col-12 pe-0 col-xl-4 pe-xl-5">
            <div class="border border-2 rounded-circle bg-light overflow-hidden">
                <img id="user-img" class="img-fluid"
                    src="../../public/Logo_Tech_Forum.svg" alt="User Image">
            </div>
            <div>
                <div id="username" class="text-center mt-4 display-5 text-break">Nifo18</div>
            </div>
        </div>
        <hr class="d-block mt-4 d-xl-none mt-xl-0">
        <div class="col-12 col-xl-8 d-flex align-items-center">
            <fieldset class="w-100">
                <legend class="text-center border-bottom pb-3"> User <PhUser /> </legend>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <div class="input-group mb-3">
                          <span class="input-group-text"><PhIdentificationCard /></span>
                        <input type="text" id="username" class="form-control" placeholder="Username" :value="userStore.username">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" id="email" class="form-control" placeholder="Username" :value="userStore.email">
                </div>
                <div class="mb-3">
                    <label for="perfil-img" class="form-label">Perfil Image</label>
                    <input class="form-control form-control-sm" id="perfil-img" type="file">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </fieldset>

        </div>
    </div>
</template>

<style scoped>
#user-img {
    width: 400px;
}
</style>