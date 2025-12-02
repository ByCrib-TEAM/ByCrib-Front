<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Estado reativo
const isLoading = ref(false)
const nameError = ref(false)
const emailError = ref(false)
const passwordWarning = ref(false)
const passwordError = ref(false)
const confirmPasswordError = ref(false)
const router = useRouter()

const form = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
})

// Validações
const validateName = () => {
    nameError.value = form.name.trim().length > 0 && form.name.trim().length < 2
}

const validateEmail = () => {
    const emailInput = document.getElementById('email')
    emailError.value = form.email && !emailInput.checkValidity()
}

const validatePassword = () => {
    passwordWarning.value = form.password.length > 0 && form.password.length < 6
    passwordError.value = form.password.length > 0 && form.password.length < 4

    // Revalidar confirmação quando senha muda
    if (form.confirmPassword) {
        validateConfirmPassword()
    }
}

const validateConfirmPassword = () => {
    confirmPasswordError.value =
        form.confirmPassword.length > 0 &&
        form.password !== form.confirmPassword
}

// Computed para verificar se o formulário é válido
const isFormValid = computed(() => {
    return form.name.trim().length >= 2 &&
        form.email.length > 0 &&
        form.password.length >= 6 &&
        form.password === form.confirmPassword &&
        !nameError.value &&
        !emailError.value &&
        !passwordError.value &&
        !confirmPasswordError.value
})

// Pinia auth store
const authStore = useAuthStore()

// Função de cadastro atualizada com redirecionamento
const handleSignup = async () => {
    if (isLoading.value || !isFormValid.value) return

    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
        alert('Por favor, preencha todos os campos')
        return
    }

    if (form.password !== form.confirmPassword) {
        alert('As senhas não coincidem')
        return
    }

    if (form.password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres')
        return
    }

    isLoading.value = true

    try {
        const payload = {
            name: form.name,
            email: form.email,
            password: form.password,
            confirm_password: form.confirmPassword
        }

        const success = await authStore.register(payload)

        if (success) {
            // register já faz login automático na store
            await router.push('/')
        } else {
            alert(authStore.error || 'Erro ao cadastrar usuário')
        }

        // Limpar formulário após sucesso (ou mesmo se falhar, opcional)
        form.name = ''
        form.email = ''
        form.password = ''
        form.confirmPassword = ''

    } catch (error) {
        console.error('Erro no cadastro:', error)
        alert('Erro ao fazer cadastro. Tente novamente.')
    } finally {
        isLoading.value = false
    }
}

// Função para ir ao login
const handleLogin = () => {
    console.log('Fazer login clicado')
    router.push('/LoginPage') 
}
</script>

<template>
    <div class="signup-container">
        <div class="signup-form">
            <div class="breadcrumb">
                <span>Início</span>
                <span class="separator">></span>
                <span>Minha Conta</span>
                <span class="separator">></span>
                <span class="current">Cadastro</span>
            </div>

            <h1 class="title">CADASTRO</h1>

            <form @submit.prevent="handleSignup" autocomplete="off">
                <div class="input-group">
                    <input v-model="form.name" type="text" id="name" placeholder="Nome completo:" class="input-field"
                        :class="{ 'error': nameError }" autocomplete="off" required @input="validateName" />
                </div>

                <div class="input-group">
                    <input v-model="form.email" type="email" id="email" placeholder="Email:" class="input-field"
                        :class="{ 'error': emailError }" autocomplete="off" required @input="validateEmail" />
                </div>

                <div class="input-group">
                    <input v-model="form.password" type="password" id="password" placeholder="Senha:"
                        class="input-field" :class="{ 'warning': passwordWarning, 'error': passwordError }"
                        autocomplete="new-password" required @input="validatePassword" />
                </div>

                <div class="input-group">
                    <input v-model="form.confirmPassword" type="password" id="confirmPassword"
                        placeholder="Confirmar senha:" class="input-field" :class="{ 'error': confirmPasswordError }"
                        autocomplete="new-password" required @input="validateConfirmPassword" />
                </div>

                <button type="submit" class="signup-button" :disabled="isLoading || !isFormValid">
                    {{ isLoading ? 'CADASTRANDO...' : 'CADASTRAR' }}
                </button>
            </form>

            <div class="login-link">
                <span>Já possui uma conta? </span>
                <a href="#" @click.prevent="handleLogin" class="login-text">Fazer login</a>
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

.signup-container {
    margin-top: -64px;
    min-height: 100vh;
    background-image: url('../images/loginBackground.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.breadcrumb {
    text-align: center;
    color: white;
    font-size: 0.9rem;
}

.separator {
    margin: 0 0.5rem;
}

.current {
    color: white;
    font-weight: 500;
}

.signup-form {
    width: 600px;
    margin: 0 auto;
    backdrop-filter: blur(16px);
    padding: 3rem 2rem;
    border: 2px solid transparent;
    border-radius: 20px;
}

.title {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    color: white;
    margin-bottom: 2rem;
    letter-spacing: 0.05em;
}

.input-group {
    margin-bottom: 1.5rem;
    position: relative;
}

.input-field {
    color: white;
    width: 100%;
    padding: 0.3rem 0.5rem;
    border: 1px solid white;
    border-radius: 15px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    outline: none;
    box-sizing: border-box;
}

.input-field:focus {
    border-color: gray;
}

.input-field.error {
    border-color: #dc3545;
}

.input-field.warning {
    border-color: #ffc107;
}

.input-field::placeholder {
    color: white;
    opacity: 0.7;
}

.signup-button {
    width: 100%;
    background-color: white;
    color: black;
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

.signup-button:hover:not(:disabled) {
    background-color: gray;
}

.signup-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.login-link {
    text-align: center;
    margin-top: 2rem;
    color: white;
    font-size: 0.9rem;
}

.login-text {
    color: white;
    text-decoration: underline;
    cursor: pointer;
}

.login-text:hover {
    color: gray;
}

@media (max-width: 480px) {
    .signup-container {
        padding: 1rem;
    }

    .signup-form {
        padding: 2rem 1.5rem;
    }

    .title {
        font-size: 1.5rem;
    }
}
</style>