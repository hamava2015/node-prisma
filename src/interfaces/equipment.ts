enum EquipmentType {
    Truck = 'Truck',
    Forklift = 'Forklift',
    Crane = 'Crane',
}
type EquipmentTypeString = keyof typeof EquipmentType;

enum EquipmentStatus {
    Available = 'Available',
    CheckedOut = 'CheckedOut',
}

interface IEquipmentRequestBody {
    name: string;
    type: EquipmentTypeString;
    location: string;
    status: EquipmentStatus;
}

export { IEquipmentRequestBody, EquipmentType };
