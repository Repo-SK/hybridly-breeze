<script setup lang="ts">
import unquote from '~/utilities/unquote';
import TextField from '~/components/text-field.vue';
import { RouterLink } from '@hybridly/vue';

const form = useForm({
    method: 'POST',
    url: route('login'),
    fields: {
        email: '',
        password: '',
        remember: true,
    },
});
</script>

<template layout="auth">
    <!-- fortify returns status in quotes (e.g. "message sent") -->
    <span class="text-sm font-medium text-theme-success">{{
        unquote(useProperty('status').value || '')
    }}</span>

    <form @submit.prevent="form.submit" class="space-y-5">
        <!-- Email -->
        <TextField
            v-model="form.fields.email"
            :error="form.errors.email"
            id="email"
            label="Email"
            type="email"
            required
        />

        <!-- Password -->
        <TextField
            v-model="form.fields.password"
            :error="form.errors.password"
            id="password"
            label="Password"
            type="password"
            required
        />

        <!-- Remember me -->
        <div class="flex items-center space-x-2">
            <input
                v-model="form.fields.remember"
                class="checkbox"
                type="checkbox"
                name="remember"
                id="remember"
            />
            <label class="text-sm text-theme-muted" for="remember"
                >Remember me</label
            >
        </div>

        <div
            class="flex flex-col items-start justify-between space-x-0 space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0"
        >
            <RouterLink :href="route('register')" class="button-link">
                Register account
            </RouterLink>

            <RouterLink :href="route('password.request')" class="button-link">
                Forgot your password?
            </RouterLink>

            <button
                type="submit"
                class="button w-full py-2 md:w-max"
                :class="{ loading: form.processing }"
                :disabled="form.processing"
            >
                Sign in
            </button>
        </div>
    </form>
</template>
