<template>
    <div class="bg-white p-10 w-full">
        <h1 class="ml-6 mb-10 text-3xl font-bold text-gray-600">Courses</h1>
        <div class="card flex flex-wrap justify-between gap-4">
            <Card style="width: 30%; overflow: hidden">
                <template #header>
                    <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
                </template>
                <template #title>Course Name</template>
                <template #subtitle>Course Duration</template>
                <template #content>
                    <p class="m-0">
                        About Course
                    </p>
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <router-link :to="'/chapters'">
              <Button label="Enroll" class="w-full" />
            </router-link>
                    </div>
                </template>
            </Card>

            <Card style="width: 30%; overflow: hidden">
                <template #header>
                    <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
                </template>
                <template #title>Course Name</template>
                <template #subtitle>Course Duration</template>
                <template #content>
                    <p class="m-0">
                        About Course
                    </p>
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <router-link :to="'/chapters'">
              <Button label="Enroll" class="w-full" />
            </router-link>
                    </div>
                </template>
            </Card>

            <Card style="width: 30%; overflow: hidden">
                <template #header>
                    <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
                </template>
                <template #title>Course Name</template>
                <template #subtitle>Course Duration</template>
                <template #content>
                    <p class="m-0">
                        About Course
                    </p>
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <router-link :to="'/chapters'">
              <Button label="Enroll" class="w-full" />
            </router-link>
                    </div>
                </template>
            </Card>
        </div>
    </div>
    <div class="bg-white p-10 w-full">
        <div class="card flex flex-wrap justify-between gap-4">
            <Card style="width: 30%; overflow: hidden">
                <template #header>
                    <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
                </template>
                <template #title>Course Name</template>
                <template #subtitle>Course Duration</template>
                <template #content>
                    <p class="m-0">
                        About Course
                    </p>
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <router-link :to="'/chapters'">
              <Button label="Enroll" class="w-full" />
            </router-link>
                    </div>
                </template>
            </Card>

            <Card style="width: 30%; overflow: hidden">
                <template #header>
                    <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
                </template>
                <template #title>Course Name</template>
                <template #subtitle>Course Duration</template>
                <template #content>
                    <p class="m-0">
                        About Course
                    </p>
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <router-link :to="'/chapters'">
              <Button label="Enroll" class="w-full" />
            </router-link>
                    </div>
                </template>
            </Card>

            <Card style="width: 30%; overflow: hidden">
                <template #header>
                    <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
                </template>
                <template #title>Course Name</template>
                <template #subtitle>Course Duration</template>
                <template #content>
                    <p class="m-0">
                        About Course
                    </p>
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <router-link :to="'/chapters'">
              <Button label="Enroll" class="w-full" />
            </router-link>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Divider from 'primevue/divider';
import Card from 'primevue/card';

export default defineComponent({
    name: 'Courses',
    components: {
        Divider,
        Card
    },
    setup() {
        return {};
    }
});
</script>
