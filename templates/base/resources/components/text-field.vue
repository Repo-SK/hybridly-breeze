<script setup lang="ts">
import { InputProps } from "~/types/input";

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
    <div class="flex flex-col space-y">
        <label
            v-if="$props.label"
            :for="$props.id"
            class="text-sm text-theme-muted"
            >{{ $props.label }}</label
        >
        <label
            v-if="$props.description"
            :for="$props.id"
            class="text-sm text-theme-muted"
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
            v-text="$props.errors"
            class="text-sm text-theme-danger"
        />
    </div>
</template>
