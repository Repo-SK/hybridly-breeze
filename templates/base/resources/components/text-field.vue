<script setup lang="ts">
import { InputProps } from '@/types/input';

const $props = defineProps<
    InputProps & {
        id: string;
        label?: string;
        description?: string;
        error?: string;
        modelValue?: string;
    }
>();
</script>

<template>
    <div class="space-y flex flex-col">
        <label
            v-if="$props.label"
            :for="$props.id"
            class="text-theme-muted text-sm"
            >{{ $props.label }}</label
        >
        <label
            v-if="$props.description"
            :for="$props.id"
            class="text-theme-muted text-sm"
            >{{ $props.description }}</label
        >
        <input
            v-on:input="
                $emit(
                    'update:modelValue',
                    ($event?.target as HTMLTextAreaElement)?.value
                )
            "
            class="input"
            :name="$props.name"
            :id="$props.id"
            :type="$props.type || 'text'"
            :required="$props.required"
            :placeholder="$props.placeholder"
            :value="$props.modelValue"
        />
        <span
            v-if="$props.error"
            v-text="$props.error"
            class="text-theme-danger text-sm"
        />
    </div>
</template>
