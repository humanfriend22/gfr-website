<script setup lang="ts">
import { users } from '~/composables/firebase';

const userCategory = ref('Officer');

const tabs = ref<{ [key: string]: string }>({
    'all': 'All',
    'club_roster': 'Club Roster',
    'board': 'Board',
    'resurgence': 'Resurgence',
    'velocity': 'Velocity',
    'ascension': 'Ascension',
    'kreamers': 'Kreamers'
});
const activeTab = ref('club_roster');
</script>

<template>
    <div>
        <label class="input mb-3">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input type="search" required placeholder="Search" />
        </label>
        <!-- You can open the modal using ID.showModal() method -->
        <!-- Open the modal using ID.showModal() method -->
        <dialog id="user_modal" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Manage User</h3>
                <div class="m-3">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Name</legend>
                        <input type="text" class="input" placeholder="e.g. John Doe" value="Saketh C" />
                        <p class="label">Users and their captains can edit this.</p>
                    </fieldset>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Team</legend>
                        <select class="select">
                            <option>No Team</option>
                        </select>
                        <p class="label">Captains can edit those not already on a team.</p>
                    </fieldset>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Role</legend>
                        <select class="select">
                            <option>Captain</option>
                            <option>Blog</option>
                            <option>No Role</option>
                        </select>
                        <p class="label">Only admin can change this.</p>
                    </fieldset>
                </div>

                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Save</button>
                    </form>
                </div>
            </div>
        </dialog>

        <div class="overflow-x-auto max-h-[70vh] overflow-y-scroll rounded-box border border-base-content/5 bg-base-100">
            <div role="tablist" class="tabs tabs-border">
                <a role="tab" v-for="tab in Object.keys(tabs)" :class="'tab ' + (activeTab === tab ? 'tab-active' : '')" @click="() => activeTab = tab">
                    {{ tabs[tab] }}
                </a>
            </div>
            <div>
                <ul class="list bg-base-100 rounded-box shadow-md">
                    <li class="list-row" v-for="user of users">
                        <div>
                            <img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
                        </div>
                        <div class="grid grid-cols-2">
                            <div>
                                <div>{{ user.name }}</div>
                                <div class="text-gray-400 mb-0.5">{{ user.email }}</div>
                                <div></div>
                                <div class="badge badge-sm badge-error mr-1 p-2.5">Admin</div>
                                <div class="badge badge-sm bg-blue-500 mr-1 p-2.75">Captain</div>
                                <div class="badge badge-sm bg-green-600 p-2.75">Blog</div>
                            </div>
                            <div class="flex items-center">
                                <div>5327R</div>
                            </div>
                        </div>
                        <button class="btn btn-square btn-ghost">
                            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                                    <path d="M6 3L20 12 6 21 6 3z"></path>
                                </g>
                            </svg>
                        </button>
                        <button class="btn btn-square btn-ghost">
                            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </g>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
select:focus {
    outline: 2px !important;
}
</style>