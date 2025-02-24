import { EquipmentModel } from "./EquipmentModel"
import { Position } from "./EquipmentPositionHistory"
import { EquipmentState } from "./EquipmentState"

export interface Equipment {
  id: string,
  equipmentModelId: string,
  name: string
}

export type Equipments = Array<Equipment>

export type EquipmentResponse = {
  equipmentModelId: string,
  id: string,
  name: string,
  model?: EquipmentModel,
  position?: Position,
  state?: EquipmentState
}