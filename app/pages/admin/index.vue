<script setup lang="ts">
import EditAccountContent from '~/components/modals/EditAccountContent.vue';

definePageMeta({
    layout: 'admin'
});

</script>

<template>
    <Section class="px-5 flex flex-col gap-5">
        <h1 class="text-4xl font-bold">Welcome!</h1>
        <div class="w-96 border-b-base-300/20 b-1 rounded-box">
            <ClientOnly>
                <ModalsEditUserContent :for-owner="true" v-if="currentUserData" :user="currentUserData">
                    Manage Account
                </ModalsEditUserContent>
            </ClientOnly>
        </div>
    </Section>
</template>