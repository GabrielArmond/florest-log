<template>
  <div class="text-center pa-4 inter">
    <v-dialog v-model="showDialog" width="auto">
      <v-card max-width="600">
        <v-card-title class="d-flex align-center justify-space-between ga-2">
          <div class="d-flex align-center ga-1">
            <Icon name="mdi:information-slab-box" size="1.5rem" style="color: #003184" />
            <span class="font-weight-regular">
              Histórico de estados do equipamento:</span> <span class="font-weight-bold">{{ equipmentName }}</span>
          </div>
          <div class="d-flex align-center">
            <v-btn icon="$close" @click="close" size="x-small" variant="tonal" />
          </div>
        </v-card-title>
        <v-card-text>
          <div class="d-flex align-center justify-start ga-1">
            Status atual:
            <span class="d-flex align-center ga-1 font-weight-bold">
              <Icon name="material-symbols-light:circle" :style="`color: ${equipmentCurrentState?.color}`" /><span>{{
                equipmentCurrentState?.name }}</span>
            </span>
          </div>
          <ClientOnly>
            <v-infinite-scroll :height="300" :items="equipmentStatesPagination" :onLoad="load" mode="manual"
              load-more-text="Carregar mais">
              <template v-for="(state, index) in equipmentStatesPagination" :key="index">
                <div class="d-flex flex-column align-center justify-center mr-2">
                  <v-card class="my-1 w-100 pa-3" variant="tonal" rounded="md">
                    <div class="d-flex align-center justify-start ga-2">
                      <span class="d-flex align-center stateKey">Data: <span class="stateValue font-weight-bold">{{
                        formatIsoToBrDate(state.date, true) }} </span>
                      </span>
                      <span class="d-flex align-center ga-1 stateKey">
                        Status:
                        <Icon name="material-symbols-light:circle" :style="`color: ${state.color}`" />
                        <span class="stateValue font-weight-bold">{{ state.name }}</span>
                      </span>
                    </div>
                  </v-card>
                </div>
              </template>
            </v-infinite-scroll>
          </ClientOnly>

        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Fechar" @click="showDialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useShowDialogEquipmentDetails } from '@composables/utilities/store';
import type { EquipmentStateHistory } from '@dtos/EquipmentStateHistory';
import type { EquipmentsState, EquipmentState } from '@dtos/EquipmentState';

interface Props {
  equipmentName?: string,
  equipmentId?: string,
  equipmentCurrentState?: EquipmentState
  equipmentStateHistory: EquipmentStateHistory | null
  equipmentsStates: EquipmentsState
}

type EquipmentStatesPagination = {
  color: string,
  date: string,
  equipmentStateId: string
  name: string
}

const { equipmentStateHistory, equipmentsStates } = defineProps<Props>()

const showDialog = useShowDialogEquipmentDetails()

const itemsPerPage = 5;
const currentPage = ref(1);

const equipmentStatesPagination = computed<EquipmentStatesPagination[]>(() => {
  if (
    !equipmentsStates ||
    !equipmentStateHistory ||
    !equipmentStateHistory.states
  ) {
    return [];
  }


  return equipmentStateHistory.states
    .map((stateHistory) => {
      const state = equipmentsStates?.find(
        (state) => state.id === stateHistory.equipmentStateId
      );

      return {
        equipmentStateId: stateHistory.equipmentStateId,
        date: stateHistory.date,
        name: state?.name || 'Desconhecido',
        color: state?.color || '#000'
      };
    })
    .slice(0, currentPage.value * itemsPerPage);
});

const totalPages = computed(() => {
  if (equipmentStateHistory?.states)
    return Math.ceil(equipmentStateHistory?.states.length / itemsPerPage)
  return 1
})


function load({ done }: { done: (status: 'error' | 'loading' | 'empty' | 'ok') => void }) {
  if (equipmentStateHistory?.states && totalPages.value >= equipmentStateHistory?.states.length) {
    return
  }

  currentPage.value++
  done('ok')
}

function close() {
  showDialog.value = false
}

</script>

<style scoped>
.stateValue {
  font-size: 16px;
}

.stateKey {
  font-size: 14px;
}
</style>