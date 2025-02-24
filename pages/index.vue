<template>
  <section class="flex-column align-start justify-center w-100 inter">
    <Map :equipments="equipments || []" @open-equipments-details="showDialogEquipmentDetails" />
  </section>
  <DialogDetails :equipment-id="equipmentStore.equipmentSelected?.id"
    :equipment-name="equipmentStore.equipmentSelected?.name"
    :equipment-state-history="equipmentStore.equipmentStateHistorySelected" />
</template>

<script setup lang="ts">
import type { EquipmentResponse } from '@dtos/Equipment';
import { useEquipmentsStore } from '@composables/stores/useEquipmentsStore';
import { useShowDialogEquipmentDetails } from '@composables/utilities/store';

definePageMeta({
  layout: 'landing'
})

const { data: equipments } = await useFetch<EquipmentResponse[]>('/api/equipments')
const equipmentStore = useEquipmentsStore()
const showDialogEquipmentDetail = useShowDialogEquipmentDetails()

if (equipments.value) {
  equipmentStore.equipments = equipments.value
}

async function showDialogEquipmentDetails(eqp: EquipmentResponse) {
  const data = await $fetch(`/api/equipments/state-history/${eqp.id}`)
  equipmentStore.equipmentSelected = eqp
  equipmentStore.equipmentStateHistorySelected = data
  console.log('equipmentStateHistorySelected', { data, eqp: equipmentStore.equipmentStateHistorySelected })
  showDialogEquipmentDetail.value = true
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