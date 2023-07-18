<script setup lang="ts">
import unquote from '@/utilities/unquote';
import TextField from '@/components/text-field.vue';

const form = useForm({
    method: 'POST',
    url: route('password.email'),
    fields: {
        email: '',
    },
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

        <!-- fortify returns status in quotes (e.g. "message sent") -->
        <span class="text-sm font-medium text-theme-success">{{
            unquote(useProperty('status').value || '')
        }}</span>

        <button
            type="submit"
            class="button w-full"
            :class="{ 'loading-absolute': form.processing }"
            :disabled="form.processing"
        >
            Reset Password
        </button>
    </form>
</template>
