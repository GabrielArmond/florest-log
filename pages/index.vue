<template>
  <section class="flex-column align-start justify-center w-100 inter">
    <Map :equipments="equipments || []" @open-equipments-details="showDialogEquipmentDetails" />
    <div class="d-flex align-center justify-center flex-wrap ga-2 my-5 mx-2 w-100">
      <MapCaption v-for="(eqp, index) in equipments" :key="index" :equipment-name="eqp.name"
        :icon="eqp.icon || 'material-symbols-light:location-on'"
        :is-last="equipments && equipments.length - 1 === index" />
    </div>
  </section>
  <DialogDetails :equipment-id="equipmentStore.equipmentSelected?.id"
    :equipment-name="equipmentStore.equipmentSelected?.name"
    :equipment-current-state="equipmentStore.equipmentSelected?.state"
    :equipment-state-history="equipmentStore.equipmentStateHistorySelected"
    :equipments-states="equipmentStore.equipmentsStates" :equipment-model="equipmentStore.equipmentSelected?.model" />
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
  equipments.value = equipments.value.map(eqp => {
    return {
      ...eqp,
      icon: equipmentIcons[removeHyphen(eqp.name)] ?? 'material-symbols-light:location-on'
    }
  })
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

onMounted(() => {
  if (equipments.value) {
    snackBarStore.openSnackbar('Equipamentos buscados com sucesso.', 'success')
  }
})


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