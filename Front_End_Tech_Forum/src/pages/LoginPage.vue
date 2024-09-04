<script setup>

import { PhUserCircle, PhEnvelope, PhKey } from '@phosphor-icons/vue';
import { ref } from 'vue';

const email = ref('')
const password = ref('')

function haddleSubmit(e) {
  e.preventDefault()
  console.log("Email:", email.value)
  console.log("Password:", password.value)
}

</script>

<template>
  <main class="mt-5">
    <div class="row d-lg-flex justify-content-center">
      <div class="border rounded p-3 col-lg-3 bg-light shadow">
        <div class="row">
          <div class="col-sm-12">
            <div class="border-bottom border-dark p-3 mb-3 d-flex align-items-center justify-content-center">
              <PhUserCircle :size="32" class="me-2" />
              <div class="lexend-font">
                Login
              </div>
            </div>
          </div>
          <div class="col-12">
            <form class="w-100" action="/login" method="POST" @submit="haddleSubmit">
              <div class="form-group mb-3">
                <PhEnvelope :size="20" class="me-2" />
                <label for="email" class="pb-2">Email</label>
                <input type="email" name="email" v-model="email" class="form-control" id="email"
                  aria-describedby="emailHelp" placeholder="Enter email" required>
              </div>
              <div class="form-group">
                <PhKey :size="20" class="me-2" />
                <label for="password" class="pb-1">Password</label>
                <input type="password" name="password" v-model="password" class="form-control" id="password"
                  placeholder="Password" required>
              </div>
              <small class="text-danger">
              </small>
              <div class="text-center pt-4">
                <button type="submit" class="btn btn-dark pe-4 ps-4">Enter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>