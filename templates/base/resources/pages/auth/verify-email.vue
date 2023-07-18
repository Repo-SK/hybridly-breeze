<script setup lang="ts">
const form = useForm({
    method: 'POST',
    url: '/email/verification-notification',
    fields: {},
});

const status = useProperty('status');
</script>

<template layout="auth">
    <form @submit.prevent="form.submit" class="space-y-5">
        <span v-if="status === 'verification-link-sent'"
            >A new email verification link has been emailed to you!</span
        >

        <h1>Please verify your email by clicking the link sent to you.</h1>

        <button
            type="submit"
            class="button w-full"
            :class="{ 'loading-absolute': form.processing }"
            :disabled="form.processing"
        >
            Resend confirmation email
        </button>
    </form>
</template>
