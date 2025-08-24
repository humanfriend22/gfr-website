<template>
    <div class="toast z-90">
        <div v-for="toast of toasts" :class="'alert text-white ' + (toast.purpose === 'error' ? 'alert-error' : (toast.purpose === 'warn' ? 'alert-warning' : 'bg-gfr-blue'))">
            <span>{{ toast.message }}</span>
        </div>
    </div>
</template>