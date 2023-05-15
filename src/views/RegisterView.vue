<script setup>
import { useFormService } from '../composables/useFormService';

const { 
  loadData,
  sesso,
  error,
  submitForm,
  onlyGmail,
  onlyNumbers,
  state,
  rules,
  checkIban,
  v$
} = useFormService();

</script>

<template>
    <div>
      <h1>Register</h1>
      <!-- <pre>
      {{ v$ }}</pre> -->

      <div class="input-errors" v-for="(error, index) of v$.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
      </div>

      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="email" class="form-label">Email address*</label>
          <input type="email" class="form-control" id="email" v-model="v$.email.$model">
          <div class="input-errors" v-for="(error, index) of v$.email.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        
        <div class="mb-3">
          <label for="password" class="form-label">Password*</label>
          <input type="password" class="form-control" id="password" v-model="v$.password.$model">
          <div class="input-errors" v-for="(error, index) of v$.password.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="cap" class="form-label">CAP*</label>
          <input type="text" class="form-control" id="cap" v-model="v$.cap.$model" minlength="5" maxlength="5">
          <div class="input-errors" v-for="(error, index) of v$.cap.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="iban" class="form-label">IBAN*</label>
          <input type="text" class="form-control" id="iban" v-model="v$.iban.$model" minlength="27" maxlength="27">
          <div class="input-errors" v-for="(error, index) of v$.iban.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="sesso" class="form-label">Sesso*</label>
          <select id="sesso" v-model="v$.sesso.$model" @focusin="loadData">
            <option value="">Scegli sesso</option>
            <option v-for="s in sesso" :key="s">
              {{ s }}
            </option>
          </select>
          <div v-if="error"> {{  error }}</div>
          <div class="input-errors" v-for="(error, index) of v$.sesso.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="privacy">
          <label class="form-check-label" for="privacy">Privacy</label>
        </div>
        <!-- <div class="input-errors" v-for="(error, index) of v$.privacy.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div> -->
        <button type="submit" class="btn btn-primary" :disabled="v$.$invalid">Registra</button>
      </form>
  </div>
</template>
