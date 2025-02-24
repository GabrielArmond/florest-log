<template>
  <MapHeader />
  <MapLayout :equipments="equipments" @open-equipments-details="openEquipmentsDetails" />
</template>

<script setup lang="ts">
import { MapHeader, MapLayout } from '#components';
import type { EquipmentResponse } from '@dtos/Equipment';

interface Props {
  equipments: EquipmentResponse[]
}

defineProps<Props>()

const emit = defineEmits(['openEquipmentsDetails'])

function openEquipmentsDetails(eqp: EquipmentResponse) {
  emit('openEquipmentsDetails', eqp)
}
</script>
