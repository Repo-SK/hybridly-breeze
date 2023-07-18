<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import Logo from '~/components/icons/logo.vue';
import { SunIcon, MoonIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { RouterLink } from '@hybridly/vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const context = useContext();
const component = computed(() => context.value?.view.name || '');
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center bg-theme-card pt-40 sm:justify-center md:bg-theme-page md:pt-6"
    >
        <Logo class="h-20 w-20" />
        <main
            class="w-full overflow-hidden bg-theme-card px-6 py-4 shadow-none sm:max-w-md sm:rounded-lg md:mt-6 md:shadow-md"
        >
            <slot />
        </main>

        <!-- only show this if not on login/register page -->
        <RouterLink
            v-if="!['auth.login', 'auth.register'].includes(component)"
            :href="route('login')"
            class="button-link mt-5 flex items-center"
        >
            <ArrowLeftIcon class="mr-2 h-4 w-4" /> Back to sign in
        </RouterLink>
    </div>

    <!-- theme toggle fixed to top-right of dom -->
    <div class="fixed top-10 right-10">
        <button
            @click="toggleDark()"
            class="button-ghost rounded-full p-2 text-theme-muted"
        >
            <SunIcon v-if="isDark" class="h-6 w-6" />
            <MoonIcon v-else class="h-6 w-6" />
        </button>
    </div>
</template>
