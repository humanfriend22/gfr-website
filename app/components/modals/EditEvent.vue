<script setup lang="tsx">
import { collection, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

const { event, creating } = defineProps<{
    event: WebsiteEvent;
    creating: boolean;
}>();

const rawStart = ref(''), rawEnd = ref('');
const saving = ref(false);
const errorMessage = computed(() => {
    event.start = new Date(rawStart.value);
    event.end = new Date(rawEnd.value);

    if (!event.title) return 'Please enter a title for the event.';
    if (event.title.length < 2 || event.title.length > 30) return 'Invalid title (2-25 characters)';

    if (event.location.length < 5 || event.location.length > 50) return 'Invalid location (5-50 characters)';

    if (rawStart.value === '' || !event.start) return 'Please enter a start date for the event.';
    if (rawEnd.value !== '' && event.end < event.start) return 'End date cannot be before start date.';

    if (event.description.length < 10 || event.description.length > 100) return 'Invalid description (10-100 characters)';

    if (event.signup_link && !/^https?:\/\//.test(event.signup_link)) return 'Invalid signup link (must start with http:// or https://)';
    if (event.volunteer_link && !/^https?:\/\//.test(event.volunteer_link)) return 'Invalid volunteer link (must start with http:// or https://)';

    if (event.image === '' && !creating) return 'Please upload an image for the event.';
    if (event.id.length < 2 || event.id.length > 35) return 'Invalid ID (2-30 characters)';
    return '';
});

const image = useTemplateRef('image');
function updateImagePreview() {
    const files = image.value?.files;
    if (files && files.length > 0) {
        event.image = URL.createObjectURL(files[0]);
    };
};

function updateID() {
    if (event.title) {
        event.id = event.title.toLowerCase().replaceAll(' ', '-') + '-' + (new Date()).getFullYear();
    } else {
        event.id = '';
    }
};

async function save() {
    saving.value = true;

    if (event.image !== '') {
        event.image = await uploadImage(image, `events/${event.id}`);
    }

    const newEvent = {
        title: event.title,
        description: event.description,
        location: event.location,
        info: event.info,
        image: event.image,
        signup_link: event.signup_link,
        volunteer_link: event.volunteer_link,
        start: Timestamp.fromDate(event.start),
        end: rawEnd.value === '' ? Timestamp.fromMillis(0) : Timestamp.fromDate(event.end),
    };

    const documentRef = doc(firestore.value!, 'events', event.id);
    if (creating) {
        try {
            await setDoc(documentRef, newEvent);
        } catch (err) {
            console.error('Error creating event:', err);
        };
    } else {
        await updateDoc(documentRef, newEvent);
    };

    saving.value = false;
    // @ts-ignore
    document.getElementById('edit_event_modal')?.close();
};
</script>

<template>
    <dialog id="edit_event_modal" class="modal">
        <div class="modal-box w-11/12 max-w-[var(--container-5xl)] h-[var(--container-3xl)] flex flex-col">
            <h3 class="text-lg font-bold">Create Event</h3>
            <div class="flex-1">
                <div class="grid grid-cols-2 gap-6">
                    <div class="min-w-0">
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Title</legend>
                            <input type="text" class="input w-full" placeholder="Type here" v-model="event.title" @change="updateID" />
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Image</legend>
                            <input type="file" accept=".png" class="file-input w-full" ref="image" @change="updateImagePreview" />
                            <p class="label">Preview will update below.</p>
                        </fieldset>
                        <div class="flex flex-row gap-5">
                            <fieldset class="fieldset flex-1 min-w-0">
                                <legend class="fieldset-legend">Start</legend>
                                <input type="datetime-local" class="input w-full" v-model="rawStart" />
                                <p class="label">This will determine event sorting!</p>
                            </fieldset>
                            <fieldset class="fieldset flex-1 min-w-0">
                                <legend class="fieldset-legend">End</legend>
                                <input type="datetime-local" class="input w-full" v-model="rawEnd" />
                                <p class="label">Leave blank for single day events.</p>
                            </fieldset>
                        </div>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Location</legend>
                            <input type="text" class="input w-full" placeholder="Type here" v-model="event.location" />
                        </fieldset>
                        <div class="mt-2">
                            <EventCard :event="event" class="w-full" :click-handler="() => { }" />
                        </div>
                    </div>
                    <div>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Description</legend>
                            <textarea class="textarea h-24 w-full" placeholder="Shown only on event preview" v-model="event.description" />
                            <div class="label">You can use markdown!</div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Info</legend>
                            <textarea class="textarea h-24 w-full" placeholder="Shown only on event popup" v-model="event.info" />
                            <div class="label">You can use markdown!</div>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Sign Up Link</legend>
                            <input type="url" class="input w-full" placeholder="Type here" v-model="event.signup_link" />
                            <p class="label">Leave blank to disable.</p>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Volunteer Link</legend>
                            <input type="url" class="input w-full" placeholder="Type here" v-model="event.volunteer_link" />
                            <p class="label">Leave blank to disable.</p>
                        </fieldset>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">ID</legend>
                            <input type="text" class="input w-full" placeholder="Type here" v-model="event.id" :disabled="!creating" />
                            <div class="label">Must be unique across all events! Cannot be changed after creation!</div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div class="modal-action flex flex-row justify-between">
                <div class="flex flex-col justify-center">
                    <span class="text-base text-red-500">{{ errorMessage }}</span>
                </div>
                <div class="flex flex-row gap-2">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn" ref="close">Cancel</button>
                    </form>
                    <button class=" btn bg-[var(--gfr-blue)]" @click="save" :disabled="saving || errorMessage !== ''">
                        <span class="loading" v-if="saving"></span>
                        {{ saving ? 'Saving...' : 'Save' }}
                    </button>
                </div>
            </div>
        </div>
    </dialog>
</template>