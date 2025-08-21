<script setup lang="ts">
import { ModalsEditEvent } from '#components';

definePageMeta({
    layout: 'admin'
});

const creating = ref(false);
const editingEvent = ref<WebsiteEvent>({
    id: '',
    title: '',
    description: '',
    info: '',
    image: '',
    start: new Date(),
    end: new Date(),
    location: '',
    signup_link: '',
    volunteer_link: '',
});

function launchCreateEventModal() {
    creating.value = true;
    editingEvent.value = {
        id: '',
        title: '',
        description: '',
        info: '',
        image: '',
        start: new Date(),
        end: new Date(),
        location: '',
        signup_link: '',
        volunteer_link: '',
    };
    const modal = document.getElementById('edit_event_modal') as HTMLDialogElement;
    modal.showModal();
};
function launchEditEventModal(event: WebsiteEvent) {
    creating.value = false;
    editingEvent.value = event;
    const modal = document.getElementById('edit_event_modal') as HTMLDialogElement;
    modal.showModal();
};

onMounted(async () => {
    navigateTo('/admin');
    // await updateEvents(true);
});
</script>

<template>
    <Section class="px-5 flex flex-col gap-3">
        <ModalsEditEvent :event="editingEvent" :creating="creating" />

        <h1 class="text-2xl font-bold">Events</h1>
        <p class="text-gray-500">Manage events for the GFR community.</p>
        <div>
            <button class="btn bg-gfr-blue" @click="launchCreateEventModal">Create New Event</button>
        </div>
        <EventsGridContainer>
            <ClientOnly>
                <EventCard v-for="event of events" :event="event" :click-handler="launchEditEventModal"></EventCard>
            </ClientOnly>
        </EventsGridContainer>
    </Section>
</template>