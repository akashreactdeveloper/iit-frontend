<template>
  <div class="bg-white p-10 w-full">
    <div class="flex justify-between mx-10">
      <h1 class="text-3xl font-bold text-gray-600 mb-5">Published Courses</h1>
      <div class="space-x-5">
        <router-link :to="'/courseCreation'">
          <Button
            label="Add New Course"
            severity="secondary"
            variant="outlined"
            class="h-8"
          />
        </router-link>
        <Button
          label="View All"
          severity="secondary"
          variant="outlined"
          class="h-8"
          @click=""
        />

      </div>
    </div>
    <div class="">
      <div class="flex justify-between mx-10 my-5">
        <Card style="width: 30%; overflow: hidden">
          <template #header>
            <img
              alt="user header"
              src="https://primefaces.org/cdn/primevue/images/usercard.png"
            />
          </template>
          <template #title>Course Name</template>
          <template #subtitle>Course Duration</template>
          <template #content>
            <p class="m-0">About Course</p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 justify-between w-full space-x-5">
              <router-link :to="'/chapters'" class="w-full">
                <Button label="View" class="w-full" />
              </router-link>
            </div>
          </template>
        </Card>
        <Card style="width: 30%; overflow: hidden">
          <template #header>
            <img
              alt="user header"
              src="https://primefaces.org/cdn/primevue/images/usercard.png"
            />
          </template>
          <template #title>Course Name</template>
          <template #subtitle>Course Duration</template>
          <template #content>
            <p class="m-0">About Course</p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 justify-between w-full space-x-5">
              <router-link :to="'/chapters'" class="w-full">
                <Button label="View" class="w-full" />
              </router-link>
            </div>
          </template>
        </Card>
        <Card style="width: 30%; overflow: hidden">
          <template #header>
            <img
              alt="user header"
              src="https://primefaces.org/cdn/primevue/images/usercard.png"
            />
          </template>
          <template #title>Course Name</template>
          <template #subtitle>Course Duration</template>
          <template #content>
            <p class="m-0">About Course</p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 justify-between w-full space-x-5">
              <router-link :to="'/chapters'" class="w-full">
                <Button label="View" class="w-full" />
              </router-link>
            </div>
          </template>
        </Card>
      </div>

      <div class="flex justify-between mx-10 my-5">
        <Card style="width: 30%; overflow: hidden">
          <template #header>
            <img
              alt="user header"
              src="https://primefaces.org/cdn/primevue/images/usercard.png"
            />
          </template>
          <template #title>Course Name</template>
          <template #subtitle>Course Duration</template>
          <template #content>
            <p class="m-0">About Course</p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 justify-between w-full space-x-5">
              <router-link :to="'/chapters'" class="w-full">
                <Button label="View" class="w-full" />
              </router-link>
            </div>
          </template>
        </Card>
        <Card style="width: 30%; overflow: hidden">
          <template #header>
            <img
              alt="user header"
              src="https://primefaces.org/cdn/primevue/images/usercard.png"
            />
          </template>
          <template #title>Course Name</template>
          <template #subtitle>Course Duration</template>
          <template #content>
            <p class="m-0">About Course</p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 justify-between w-full space-x-5">
              <router-link :to="'/chapters'" class="w-full">
                <Button label="View" class="w-full" />
              </router-link>
            </div>
          </template>
        </Card>
        <Card style="width: 30%; overflow: hidden">
          <template #header>
            <img
              alt="user header"
              src="https://primefaces.org/cdn/primevue/images/usercard.png"
            />
          </template>
          <template #title>Course Name</template>
          <template #subtitle>Course Duration</template>
          <template #content>
            <p class="m-0">About Course</p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 justify-between w-full space-x-5">
              <router-link :to="'/chapters'" class="w-full">
                <Button label="View" class="w-full" />
              </router-link>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";

export default defineComponent({
  name: "CourseCard",
  components: {
    Card,
    Button,
  },
});
</script>
