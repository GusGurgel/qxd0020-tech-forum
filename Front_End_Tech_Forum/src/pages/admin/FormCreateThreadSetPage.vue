<script setup lang="ts">
import { api } from '@/api';
import { isApplicationError } from '@/composables/useApplicationError';
import { useUserStore } from '@/stores/userStore';
import { isAxiosError } from 'axios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { ApplicationError } from '@/types';


const router = useRouter()
const name = ref('');
const description = ref('')
const userStore = useUserStore()
const loading = ref(false)
const exception = ref<ApplicationError>()

const inputsEnter = computed(() => name.value !== "" && description.value !== "")

async function handleCreate(e: Event) {
    e.preventDefault()

    try {
        const formData = new FormData();
        formData.append("data", JSON.stringify({
            "name": name.value.trim(),
            "description": description.value.trim()
        }))

        loading.value = true

        await api.post('/thread-sets/', formData, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })

        router.push("/admin")
    } catch (e) {
        if (isAxiosError(e) && isApplicationError(e.response?.data)) {
            exception.value = e.response?.data
        }
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <main>
        <div v-if="exception" class="alert alert-danger mt-3" role="alert">
            {{ exception.error.message }}
        </div>
        <div v-if="loading" class="vh-80 d-flex justify-content-center align-items-center">
            <div class="spinner-border text-dark" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
        <form v-else @submit="handleCreate" class="pt-3">
            <div class="bg-dark text-light p-3 text-center rounded">
                <h4 class="m-0 p-0">
                    <div class="d-flex align-items-center justify-content-center">
                        Create - Thread Set
                        <PhPlusCircle class="ms-2" />
                    </div>
                </h4>
            </div>
            <div class="form-group mt-3">
                <label for="title">Name</label>
                <input required v-model="name" type="text" id="description" class="form-control">
            </div>
            <div class="form-group mt-3">
                <label for="description">Description</label>
                <textarea required v-model="description" class="form-control" id="description" rows="3"></textarea>
            </div>
            <div class="text-center mt-3">
                <button :disabled="!inputsEnter" class="btn btn-primary">
                    Create
                </button>
            </div>
        </form>
    </main>
</template>

<style scoped>
button {
    transition: opacity 0.5s;
}
</style>