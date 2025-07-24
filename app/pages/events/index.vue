<script setup lang="ts">

const selectedEvent = ref<WebsiteEvent>({
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

function launchEventInfoModal(event: WebsiteEvent) {
    selectedEvent.value = event;
    const modal = document.getElementById('event_info_modal') as HTMLDialogElement;
    modal.showModal();
};

onMounted(async () => {
    await updateEvents();
});
</script>

<template>
    <Section>
        <ModalsEventInfo :event="selectedEvent" />

        <div class="h-full md:justify-center items-center flex flex-col px-5">
            <div class="flex flex-col justify-center items-center gap-7 w-full h-full md:px-5 mt-10">
                <div class="justify-start font-bold text-3xl md:text-5xl">
                    Check Out Our <span class="gfr-gradient">Events</span>
                </div>
                <Divider />
                <EventsGridContainer>
                    <ClientOnly>
                        <EventCard v-for="event of events" :event="event" :click-handler="launchEventInfoModal"></EventCard>
                    </ClientOnly>
                </EventsGridContainer>
            </div>
        </div>

    </Section>
</template>