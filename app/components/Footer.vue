<script setup lang="ts">
const appConfig = useAppConfig();

</script>

<template>
    <footer class="footer sm:footer-horizontal mx-auto w-full text-base-content text-xl mb-20 p-10 max-w-screen-xl">
        <aside>
            <div class="flex items-center gap-5 pb-2">
                <NuxtImg src="dhs.png" width="60" height="60" class="inline" />
                <NuxtImg src="gfr.png" width="50" height="50" class="inline" />
            </div>
            <p>
                <span class="gfr-gradient font-semibold">Gael Force Robotics</span>
                <br>
                Since 2010
                <br>
                Developed by Saketh
            </p>
            <button class="btn btn-sm text-gray-400 hover:text-gray-300" @click="updateUsers(true)">Force Update Users</button>
        </aside>
        <nav>
            <h6 class="footer-title">Explore</h6>
            <a class="link hover:text-blue-500 duration-200 no-underline">About Us</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Events</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Newsletter</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Contact</a>
        </nav>
        <nav>
            <h6 class="footer-title">Events</h6>
            <a class="link hover:text-blue-500 duration-200 no-underline">Game Day</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Battle of the Bay</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Girl Powered</a>
        </nav>
        <nav>
            <h6 class="footer-title">Teams</h6>
            <a class="link hover:text-blue-500 duration-200 no-underline">Resurgence</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Kittens</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Ascension</a>
            <a class="link hover:text-blue-500 duration-200 no-underline">Velocity</a>
        </nav>
    </footer>
</template>