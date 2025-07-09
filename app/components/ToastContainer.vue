<template>
    <div class="toast absolute z-50">
        <div v-for="toast of toasts" :class="'alert text-white ' + (toast.purpose === 'error' ? 'alert-error' : (toast.purpose === 'warn' ? 'alert-warning' : 'alert-info'))">
            <span>{{ toast.message }}</span>
        </div>
    </div>
</template>