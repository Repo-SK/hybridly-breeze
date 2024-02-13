<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import DeleteUserForm from '@/views/Profile/Partials/DeleteUserForm.vue';
import LogoutOtherBrowserSessionsForm from '@/views/Profile/Partials/LogoutOtherBrowserSessionsForm.vue';
import SectionBorder from '@/components/SectionBorder.vue';
import TwoFactorAuthenticationForm from '@/views/Profile/Partials/TwoFactorAuthenticationForm.vue';
import UpdatePasswordForm from '@/views/Profile/Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from '@/views/Profile/Partials/UpdateProfileInformationForm.vue';

const props = defineProps({
    confirmsTwoFactorAuthentication: Boolean,
    sessions: Array,
    hasEmailVerification: Boolean,
    canManageTwoFactorAuthentication: Boolean,
    twoFaEnabled: Boolean,
});

const user = useProperty('security.user');
</script>

<template>
    <AppLayout title="Profile">
        <template #header>
            <h2
                class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
            >
                Profile
            </h2>
        </template>

        <div>
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div>
                    <UpdateProfileInformationForm
                        :user="user"
                        :has-email-verification="props.hasEmailVerification"
                    />

                    <SectionBorder />
                </div>

                <div>
                    <UpdatePasswordForm class="mt-10 sm:mt-0" />

                    <SectionBorder />
                </div>

                <div v-if="props.canManageTwoFactorAuthentication">
                    <TwoFactorAuthenticationForm
                        :requires-confirmation="confirmsTwoFactorAuthentication"
                        :two-fa-enabled="twoFaEnabled"
                        class="mt-10 sm:mt-0"
                    />

                    <SectionBorder />
                </div>

                <LogoutOtherBrowserSessionsForm
                    :sessions="sessions"
                    class="mt-10 sm:mt-0"
                />

                <template>
                    <SectionBorder />

                    <DeleteUserForm class="mt-10 sm:mt-0" />
                </template>
            </div>
        </div>
    </AppLayout>
</template>
