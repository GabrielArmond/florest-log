import type { EquipmentResponse } from "@dtos/Equipment"
import type { EquipmentStateHistory } from "@dtos/EquipmentStateHistory"

export const useEquipmentsStore = defineStore('useEquipments', () => {
  const equipments = ref<EquipmentResponse[]>([])
  const equipmentSelected = ref<EquipmentResponse | null>(null)
  const equipmentStateHistorySelected = ref<EquipmentStateHistory | null>(null)

  return {
    equipments,
    equipmentSelected,
    equipmentStateHistorySelected
  }
})