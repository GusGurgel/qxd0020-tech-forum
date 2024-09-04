<script setup>

import { PhUserCircle } from '@phosphor-icons/vue';
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
    <div class="container w-25 border  rounded  p-4">
      <div class="row">
        <div class="col-12">
          <div class="p-3 mb-3 d-flex align-items-center justify-content-center">
            <PhUserCircle :size="32" class="me-2" />
            <div class="lexend-font">
              Login
            </div>
          </div>
        </div>
        <div class="col-12">
          <form class="w-100" action="/login" method="POST" @submit="haddleSubmit">
            <div class="form-group mb-3">
              <label for="email">Email address</label>
              <input type="email" name="email" v-model="email" class="form-control" id="email"
                aria-describedby="emailHelp" placeholder="Enter email" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" name="password" v-model="password" class="form-control" id="password"
                placeholder="Password" required>
            </div>
            <small class="text-danger">
            </small>
            <div class="text-center pt-4">
              <button type="submit" class="btn btn-dark">Enter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>