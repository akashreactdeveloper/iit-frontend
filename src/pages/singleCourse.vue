<template>
    <div class="card bg-white flex">
        <Stepper value="1" class="h-screen w-5/6">
            <StepItem value="1">
                <Step>Part I</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                    </div>
                    <div class="py-6">
                        <Button label="Next" @click="activateCallback('2')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="2">
                <Step>Part II</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                    </div>
                    <div class="flex py-6 gap-2">
                        <Button label="Back" severity="secondary" @click="activateCallback('1')" />
                        <Button label="Next" @click="activateCallback('3')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="3">
                <Step>Part III</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <div class="flex flex-col h-48">
                        <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                    </div>
                    <div class="py-6">
                        <Button label="Back" severity="secondary" @click="activateCallback('2')" />
                    </div>
                </StepPanel>
            </StepItem>
        </Stepper>
        <div class="card flex flex-col w-1/6 px-6">
            <Card class="my-4">
                <template #title>Progression</template>
                <template #content>
                    <Timeline :value="events" layout="vertical" align="top">
                        <template #content="slotProps">
                            {{ slotProps.item }}
                        </template>
                    </Timeline>
                </template>
            </Card>
        </div>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref} from 'vue';                   // optional
  import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
  
  export default defineComponent({
    name: 'SingleCourse',
    components: {
        Stepper,
        StepList,
        StepPanels,
        StepItem,
        Step,
        StepPanel,
        Timeline,
        Card
    },
    setup() {
        const events = ref(['2020', '2021', '2022', '2023']);
      
  
      return {
        events
      };
    }
  })</script>
  