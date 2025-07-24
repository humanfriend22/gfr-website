<script setup lang="ts">
defineProps<{
    event: WebsiteEvent;
}>();
</script>

<template>
    <dialog id="event_info_modal" class="modal">
        <div class="modal-box w-11/12 max-w-[var(--container-5xl)] h-[var(--container-3xl)] flex flex-col">
            <h3 class="text-lg font-bold">{{ event.title }}</h3>
            <div class="flex-1">
                <div class="md:grid grid-cols-2 gap-3 mt-2">
                    <div class="flex flex-col gap-2">
                        <NuxtImg :src="event.image" class="rounded-box" />
                        <p>{{ event.description }}</p>
                    </div>
                </div>
            </div>

            <div class="modal-action flex flex-row justify-between">
                <div></div>
                <div class="flex flex-row gap-2">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </div>
    </dialog>
</template>