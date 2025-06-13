<script setup>
import { ref, reactive, } from 'vue'
import { useRouter } from 'vue-router'

// Composable do Vue Router
const router = useRouter()

// Estado reativo
const isLoading = ref(false)
const emailError = ref(false)
const passwordWarning = ref(false)

const form = reactive({
  email: '',
  password: ''
})

// Validações
const validateEmail = () => {
  const emailInput = document.getElementById('email')
  emailError.value = form.email && !emailInput.checkValidity()
}

const validatePassword = () => {
  passwordWarning.value = form.password.length > 0 && form.password.length < 6
}

// Função de login
const handleLogin = async () => {
  if (isLoading.value) return

  if (!form.email.trim() || !form.password.trim()) {
    alert('Por favor, preencha todos os campos')
    return
  }

  isLoading.value = true

  try {
    // Simular chamada de API
    console.log('Fazendo login com:', {
      email: form.email,
      password: form.password
    })

    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000))

    alert('Login realizado com sucesso!')

    // Navegar para dashboard após login
    router.push('/dashboard')

  } catch (error) {
    console.error('Erro no login:', error)
    alert('Erro ao fazer login. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}

// Função de esqueci senha
const handleForgotPassword = () => {
  console.log('Esqueci minha senha clicado')
  router.push('/forgot-password')
}

// Função de cadastro
const handleSignup = () => {
  console.log('Cadastre-se clicado')
  router.push('/RegisterPage')
}
</script>
<template>
  <div class="login-container">
    <div class="breadcrumb">
      <span>Início</span>
      <span class="separator">></span>
      <span>Minha Conta</span>
      <span class="separator">></span>
      <span class="current">Login</span>
    </div>

    <div class="login-form">
      <h1 class="title">LOGIN</h1>

      <form @submit.prevent="handleLogin" autocomplete="off">
        <div class="input-group">
          <input v-model="form.email" type="email" id="email" placeholder="Email:" class="input-field"
            :class="{ 'error': emailError }" autocomplete="off" required @input="validateEmail" />
        </div>

        <div class="input-group">
          <input v-model="form.password" type="password" id="password" placeholder="Senha:" class="input-field"
            :class="{ 'warning': passwordWarning }" autocomplete="new-password" required @input="validatePassword" />
          <button type="button" class="forgot-password" @click="handleForgotPassword">
            Esqueci minha senha
          </button>
        </div>

        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? 'ENTRANDO...' : 'LOGIN' }}
        </button>
      </form>

      <div class="signup-link">
        <span>Não possui uma conta? </span>
        <a href="#" @click.prevent="handleSignup" class="signup-text">Cadastre-se</a>
      </div>
    </div>
  </div>
</template>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.login-container {
  min-height: 100vh;
  background-color: white;
  padding: 2rem;
}

.breadcrumb {
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.separator {
  margin: 0 0.5rem;
}

.current {
  color: #000;
  font-weight: 500;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  padding: 3rem 2rem;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.input-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-field {
  width: 100%;
  padding: 0.3rem 0.5rem;
  border: 2px solid #000000;
  border-radius: 50px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #000000;
}

.input-field.error {
  border-color: #dc3545;
}

.input-field.warning {
  border-color: #ffc107;
}

.input-field::placeholder {
  color: #adb5bd;
}

.forgot-password {
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 0.85rem;
  text-decoration: none;
  margin-top: 0.5rem;
  padding: 0;
  display: block;
  margin-left: auto;
}

.forgot-password:hover {
  color: #393939;
}

.login-button {
  width: 100%;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  letter-spacing: 0.05em;
  margin-top: 1rem;
}

.login-button:hover:not(:disabled) {
  background-color: #333;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-link {
  text-align: center;
  margin-top: 2rem;
  color: #000000;
  font-size: 0.9rem;
}

.signup-text {
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
}

.signup-text:hover {
  color: #393939;
}

@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }

  .login-form {
    padding: 2rem 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>