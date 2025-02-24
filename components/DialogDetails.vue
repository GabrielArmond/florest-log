<template>
  <div class="text-center pa-4">
    <v-dialog v-model="showDialog" width="auto">
      <v-card max-width="600">
        <v-card-title class="d-flex align-center justify-start ga-2">
          <Icon name="mdi:information-slab-box" size="1.5rem" style="color: #003184" />
          <span class="font-weight-regular">
            Histórico de estados do equipamento:</span> <span class="font-weight-bold">{{ equipmentName }}</span>
        </v-card-title>
        <v-card-text>
          {{ equipmentStateHistory }}
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

interface Props {
  equipmentName?: string,
  equipmentId?: string,
  equipmentStateHistory: EquipmentStateHistory | null
}

defineProps<Props>()

const showDialog = useShowDialogEquipmentDetails()
</script>

<style scoped></style>