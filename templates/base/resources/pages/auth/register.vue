<script setup lang="ts">
import TextField from '~/components/text-field.vue';
import { RouterLink } from '@hybridly/vue';

const form = useForm({
    method: 'POST',
    url: route('register'),
    fields: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    },
});
</script>

<template layout="auth">
    <form @submit.prevent="form.submit" class="space-y-5">
        <!-- Name -->
        <TextField
            v-model="form.fields.name"
            :error="form.errors.name"
            id="name"
            label="Name"
            required
        />

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

        <!-- Confirm Password -->
        <TextField
            v-model="form.fields.password_confirmation"
            :error="form.errors.password_confirmation"
            id="password_confirmation"
            label="Confirm password"
            type="password"
            required
        />

        <div
            class="flex flex-col items-start justify-between space-x-0 space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0"
        >
            <RouterLink :href="route('login')" class="button-link">
                Already have an account?
            </RouterLink>

            <button
                type="submit"
                class="button w-full py-2 md:w-max"
                :class="{ loading: form.processing }"
                :disabled="form.processing"
            >
                Sign up
            </button>
        </div>
    </form>
</template>
