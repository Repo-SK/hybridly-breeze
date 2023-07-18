<script setup lang="ts">
import unquote from '@/utilities/unquote';
import TextField from '@/components/text-field.vue';

const form = useForm({
    method: 'POST',
    url: route('password.confirm'),
    fields: {
        password: '',
    },
});
</script>

<template layout="auth">
    <form @submit.prevent="form.submit" class="space-y-5">
        <!-- Password -->
        <TextField
            v-model="form.fields.password"
            :error="form.errors.password"
            id="password"
            label="Password"
            type="password"
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
            Confirm Password
        </button>
    </form>
</template>
