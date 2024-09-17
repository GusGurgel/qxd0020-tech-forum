<script setup lang="ts">
import { api } from '@/api';
import { useUploadFile } from '@/composables/useUploadURL';
import { useUserStore } from '@/stores/userStore';
import { PhUser, PhCrown} from '@phosphor-icons/vue';
import { computed, ref } from 'vue';

const userStore = useUserStore()
const perfilImg = ref<File>()

const userImage = computed(() => {
    if(userStore.image) {
        return useUploadFile(userStore.image)
    } else {
        return '../../public/Logo_Tech_Forum.svg'
    }
})

function handleImageChange(event : Event) {
    const inputEvent = event as InputEvent
    const inputPerfilImg = inputEvent.target as HTMLInputElement
    console.log(inputPerfilImg.files?.item(0))
    perfilImg.value = inputPerfilImg.files?.item(0) as File
}

async function getCurrentUserImageId() {
    const { data } = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      },
      params: {
        populate: 'image'
      }
    })

    return data?.image?.id
}

async function handleUserImageUpload(event : Event) {
    if(!perfilImg.value) {
        return
    }
    const oldImageId = await getCurrentUserImageId()
    const formDataUploadImage = new FormData()
    const formDataUpdateUser = new FormData()

    formDataUploadImage.append("files", perfilImg.value as File);

    // Fazer upload da nova imagem do usuário
    const { data } = await api.post("/upload", formDataUploadImage, {
        headers: {
            Authorization: `Bearer ${userStore.jwt}`
        }
    })
    
    // Deletar imagem antiga do usuário
    if(oldImageId) {
        await api.delete(`/upload/files/${oldImageId}`, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
    }

    formDataUpdateUser.append("image", data[0].id)
    // Alterar id da nova imagem do usuário
    await api.put(`/users/${userStore.id}`, formDataUpdateUser, {
        headers: {
            Authorization: `Bearer ${userStore.jwt}`
        }
    });
    userStore.changePerfilImageUrl(data[0].url)
}

</script>

<template>
    <div class="row mt-3 p-3 p-xl-0">
        <div class="col-12 pe-0 col-xl-4 pe-xl-5 d-flex flex-column justify-content-center align-items-center">
            <div id="user-img" class="border border-2 rounded-circle bg-light overflow-hidden">
                <img :src="userImage" class="w-100 h-100" alt="User Image">
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
        <form @submit.prevent="handleUserImageUpload" class="col-12 col-xl-8 d-flex align-items-center">
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
                    <label for="input-perfil-img" class="form-label">Perfil Image</label>
                    <input @change="handleImageChange" class="form-control form-control-sm" id="input-perfil-img" type="file">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Upload</button>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<style scoped>
#user-img {
    width: 300px;
    height: 300px;
}
</style>