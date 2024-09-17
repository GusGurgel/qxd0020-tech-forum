<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { PhUser, PhCrown} from '@phosphor-icons/vue';

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
                <div id="username" class="text-center mt-4 display-5 text-break"> 
                    <div v-if=" userStore.role.toLocaleLowerCase() === 'admin'" class="display-6 border-bottom pb-3 mb-3">
                        Administrator <PhCrown />
                    </div>
                    {{ userStore.username }} 
                </div>
            </div>
        </div>
        <hr class="d-block mt-4 d-xl-none mt-xl-0">
        <div class="col-12 col-xl-8 d-flex align-items-center">
            <fieldset class="w-100">
                <legend class="text-center border-bottom pb-3"> User <PhUser /> </legend>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input disabled type="text" id="username" class="form-control" placeholder="username" :value="userStore.username">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input disabled type="text" id="email" class="form-control" placeholder="email" :value="userStore.email">
                </div>
                <div class="mb-3 border-top pt-3 mt-3">
                    <label for="perfil-img" class="form-label">Perfil Image</label>
                    <input class="form-control form-control-sm" id="perfil-img" type="file">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Upload</button>
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