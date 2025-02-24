<template>
  <div class="text-center pa-4 inter">
    <v-dialog v-model="showDialog" width="800" height="600">
      <v-card>
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
          <div class="d-flex align-center justify-start ga-1">
            Ganho atual:
            <span class="d-flex align-center ga-1 font-weight-bold">
              {{ totalCurrentEarning }}
            </span>
          </div>
          <ClientOnly>
            <v-infinite-scroll :height="400" :items="equipmentStatesPagination" :onLoad="load" mode="manual"
              load-more-text="Carregar mais">
              <template v-for="(state, index) in equipmentStatesPagination" :key="index">
                <div class="d-flex flex-column align-center justify-center mr-2">
                  <v-card class="my-1 w-100 pa-3" variant="tonal" rounded="md">
                    <div class="d-flex align-center justify-start ga-6">
                      <span class="d-flex align-center ga-1 stateKey">
                        Data: <span class="stateValue font-weight-bold">
                          {{ formatIsoToBrDate(state.date, true) }}
                        </span>
                      </span>
                      <span class="d-flex align-center ga-1 stateKey">
                        Status:
                        <Icon name="material-symbols-light:circle" :style="`color: ${state.color}`" />
                        <span class="stateValue font-weight-bold">{{ state.name }}</span>
                      </span>
                      <span class="d-flex align-center ga-1 stateKey">
                        Ganho:
                        <span class="stateValue font-weight-bold" :style="`color: ${state.color};`">{{
                          formatMoney(state.earning || 0)
                        }}/hora</span>
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
import type { EquipmentModel } from '@dtos/EquipmentModel';

interface Props {
  equipmentsStates: EquipmentsState,
  equipmentName?: string,
  equipmentId?: string,
  equipmentCurrentState?: EquipmentState,
  equipmentStateHistory: EquipmentStateHistory | null
  equipmentModel?: EquipmentModel
}

type EquipmentStatesPagination = {
  color: string,
  date: string,
  equipmentStateId: string
  name: string,
  earning?: number
}

const { equipmentStateHistory, equipmentsStates, equipmentModel } = defineProps<Props>()

const showDialog = useShowDialogEquipmentDetails()

const itemsPerPage = 10;
const currentPage = ref(1);

const equipmentStatesPagination = computed<EquipmentStatesPagination[]>(() => {
  if (
    !equipmentsStates ||
    !equipmentStateHistory ||
    !equipmentStateHistory.states ||
    !equipmentModel
  ) {
    return [];
  }


  return equipmentStateHistory.states
    .map((stateHistory) => {
      const state = equipmentsStates?.find(
        (state) => state.id === stateHistory.equipmentStateId
      );

      const earning = equipmentModel.hourlyEarnings.find(model => model.equipmentStateId === state?.id)
      return {
        equipmentStateId: stateHistory.equipmentStateId,
        date: stateHistory.date,
        name: state?.name || 'Desconhecido',
        color: state?.color || '#000',
        earning: earning?.value
      };
    })
    .slice(0, currentPage.value * itemsPerPage);
});

const totalCurrentEarning = computed(() => {
  if (
    !equipmentStateHistory ||
    !equipmentStateHistory.states ||
    !equipmentModel
  ) {
    return [];
  }

  const equipmentsAnalyzed = equipmentStateHistory.states.map((stateHistory) => {
    const state = equipmentsStates?.find(
      (state) => state.id === stateHistory.equipmentStateId
    );

    const earning = equipmentModel.hourlyEarnings.find(model => model.equipmentStateId === state?.id)

    return {
      ...state,
      earning
    }
  })

  const calculateTime = calculateTimePerState(equipmentStateHistory)

  const initialValue = 0
  const total = equipmentsAnalyzed.reduce(
    (accumulator, state) => {
      return accumulator + ((state?.id && state.earning?.value && state.earning?.value * calculateTime[state.id]) || 0)
    },
    initialValue
  )

  return formatMoney(total)
})

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