<script setup lang="ts">
import unquote from '@/utilities/unquote';
import TextField from '@/components/text-field.vue';

const $props = defineProps<{
    token?: string;
    email?: string;
}>();

const form = useForm({
    method: 'POST',
    url: route('password.update'),
    fields: {
        email: $props.email,
        password: '',
        password_confirmation: '',
        token: $props.token,
    },
});

onMounted(() => {
    if (!$props.token) {
        router.get(route('login'));
    }
});
</script>

<template layout="auth">
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

        <!-- Confirm Password -->
        <TextField
            v-model="form.fields.password_confirmation"
            :error="form.errors.password_confirmation"
            id="password_confirmation"
            label="Confirm password"
            type="password"
            required
        />

        <!-- fortify returns status in quotes (e.g. "message sent") -->
        <span class="text-sm font-medium text-theme-success">{{
            unquote(useProperty('status').value || '')
        }}</span>

        <button
            type="submit"
            class="button-primary w-full"
            :class="{ 'loading-absolute': form.processing }"
            :disabled="form.processing"
        >
            Reset Password
        </button>
    </form>
</template>
