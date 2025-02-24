import { EquipmentFactory } from "@factories/EquipmentFactory";
import { EquipmentResponse } from "@dtos/Equipment";
import { showSnackbar } from "~/composables/utilities/useSnackbar";

export default defineEventHandler(async (event): Promise<EquipmentResponse[]> => {
  const equipmentProvider = EquipmentFactory.createService()

  try {
    const equipments = await equipmentProvider.getEquipments()
    const equipmentsModel = await equipmentProvider.getEquipmentsModel()
    const equipmentsPositionHistory = await equipmentProvider.getEquipmentsPositionHistory()
    const equipmentsState = await equipmentProvider.getEquipmentsState()
    const equipmentsStateHistory = await equipmentProvider.getEquipmentsStateHistory()

    const lastEquipments = equipments.map((equipment) => {
      const lastStates = equipmentsStateHistory.find(stateHistory => stateHistory.equipmentId === equipment.id)?.states
      const lastPositions = equipmentsPositionHistory.find(position => position.equipmentId === equipment.id)?.positions

      const model = equipmentsModel.find(model => model.id === equipment.equipmentModelId)
      const state = equipmentsState.find((state) => state.id === lastStates?.[lastStates.length - 1]?.equipmentStateId)
      const position = lastPositions?.[lastPositions.length - 1]

      return {
        id: equipment.id,
        name: equipment.name,
        equipmentModelId: equipment.equipmentModelId,
        model,
        state,
        position
      }
    })

    showSnackbar('success', 'Equipamentos encontrados com sucesso.')
    return lastEquipments
  } catch (error) {
    showSnackbar('error', 'Erro ao buscar equipamentos.')
    throw new Error('Error on get Equipments')
  }
});