<template>
  <section class="flex-column align-start justify-center w-100 inter">
    <Map :equipments="equipments || []" @open-equipments-details="showDialogEquipmentDetails" />
  </section>
  <DialogDetails :equipment-id="equipmentStore.equipmentSelected?.id"
    :equipment-name="equipmentStore.equipmentSelected?.name"
    :equipment-current-state="equipmentStore.equipmentSelected?.state"
    :equipment-state-history="equipmentStore.equipmentStateHistorySelected"
    :equipments-states="equipmentStore.equipmentsStates" />
</template>

<script setup lang="ts">
import type { EquipmentResponse } from '@dtos/Equipment';
import { useEquipmentsStore } from '@composables/stores/useEquipmentsStore';
import { useShowDialogEquipmentDetails } from '@composables/utilities/store';
import { useSnackbarStore } from '@composables/utilities/useSnackbar';

definePageMeta({
  layout: 'landing'
})

const equipmentStore = useEquipmentsStore()
const showDialogEquipmentDetail = useShowDialogEquipmentDetails()
const snackBarStore = useSnackbarStore()

const { data: equipments } = await useFetch<EquipmentResponse[]>('/api/equipments')
if (equipments.value) {
  equipmentStore.equipments = equipments.value
  snackBarStore.openSnackbar('Equipamentos buscados com sucesso.', 'success')
}

async function showDialogEquipmentDetails(eqp: EquipmentResponse) {
  const equipmentStateHistory = await $fetch(`/api/equipments/state-history/${eqp.id}`)
  const equipmentsStates = await $fetch('/api/equipments/states')

  equipmentStore.equipmentSelected = eqp

  equipmentStore.equipmentStateHistorySelected = equipmentStateHistory


  equipmentStore.equipmentsStates = equipmentsStates


  if (equipmentsStates && equipmentStateHistory && equipmentStore.equipmentSelected) {
    showDialogEquipmentDetail.value = true
  } else {
    snackBarStore.openSnackbar(`Erro ao carregar mais detalhes do equipamento: ${eqp.id}`, 'error')
  }
}


</script>

<style>
.equipment {
  font-size: 16px;
  font-weight: bold;

  .equipmentKey {
    font-weight: normal;
    font-size: 14px;
  }
}

.equipmentState {
  font-size: 14px;
}

.moreDetails {
  font-size: 12px;
  color: #808080;
}

.leaflet-div-icon {
  background-color: transparent;
  text-align: center;
  border: none;
}
</style>