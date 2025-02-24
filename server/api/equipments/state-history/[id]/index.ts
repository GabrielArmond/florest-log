import { showSnackbar } from "@composables/utilities/useSnackbar"
import { EquipmentFactory } from "@factories"
import { EquipmentStateHistory } from "@dtos/EquipmentStateHistory"

export default defineEventHandler(async (event): Promise<EquipmentStateHistory> => {
  const equipmentProvider = EquipmentFactory.createService()
  try {
    const id = event.context.params?.id

    if (!id) {
      showSnackbar('error', `Id do equipamento não encontrado`)
      throw new Error('Id not found')
    }

    const equipmentStateHistory = await equipmentProvider.getEquipmentsStateHistoryById(id)

    return equipmentStateHistory
  } catch (error) {
    showSnackbar('error', `Erro ao buscar equipamento: ${event.context.params?.id}`)
    throw new Error('Error get equipment state history by id')
  }
})