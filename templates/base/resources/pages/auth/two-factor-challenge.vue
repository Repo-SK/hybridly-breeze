<script setup lang="ts">
import TextField from '@/components/text-field.vue';

const form = useForm({
    method: 'POST',
    url: route('two-factor.login'),
    fields: {
        code: '',
    },
});
</script>

<template layout="auth">
    <form @submit.prevent="form.submit" class="space-y-5">
        <!-- Code -->
        <TextField
            v-model="form.fields.code"
            :error="form.errors.code"
            id="code"
            label="Authentication token or recovery code"
            type="text"
            required
        />

        <button
            type="submit"
            class="button-primary w-full"
            :class="{ 'loading-absolute': form.processing }"
            :disabled="form.processing"
        >
            Login
        </button>
    </form>
</template>
