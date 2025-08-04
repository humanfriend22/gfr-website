<script setup lang="ts">
import { doc, updateDoc } from 'firebase/firestore';

const errorMessage = ref('');
const saving = ref(false);

async function save() {
    saving.value = true;

    try {
        // Assuming `site` is a reactive object containing the steps
        await updateDoc(
            doc(firestore.value!, 'site', 'site'),
            { steps: site.value.steps }
        );
        errorMessage.value = '';
    } catch (error) {
        console.error('Error saving steps:', error);
        errorMessage.value = 'Failed to save steps. Please try again.';
    } finally {
        saving.value = false;
    }
}
</script>

<template>
    <dialog id="edit_steps_modal" class="modal">
        <div class="modal-box w-11/12 max-w-[var(--container-5xl)] h-[var(--container-3xl)] flex flex-col">
            <h3 class="text-lg font-bold">Edit Steps</h3>
            <p>Skip step 0 to start at step 1.</p>
            <div class="h-full overflow-scroll w-full mt-2 grid grid-rows-2 gap-2">
                <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full table-pin-rows">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>Step</th>
                                <th>Title</th>
                                <th>Markdown</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(step, index) in site.steps" :key="index">
                                <th>{{ index }}</th>
                                <td><input type="text" placeholder="Type here" class="input" v-model="step.title" :disabled="index > 1 && site.steps[index - 1].title === ''" /></td>
                                <td><textarea class="textarea" v-model="step.markdown" :disabled="step.title === ''"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div class="h-fit">
                        <join-us-steps-content />
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