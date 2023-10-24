import { Request, Response } from 'express';
import { addEquipment, getEquipments, checkoutEquipment } from '../services/equipmentService';
import { IEquipmentRequestBody } from '../interfaces/equipment';

export const add = async (req: any, res: Response) => {
    try {
        const data = req.body as IEquipmentRequestBody;
        const equipment = await addEquipment(data, req.user);
        res.status(201).json(equipment);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

export const get = async (req: any, res: Response) => {
    try {
        const { type, location } = req.query;
        const equipmentList = await getEquipments(type, location);
        res.json(equipmentList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve equipment list' });
    }
};

export const checkout = async (req: any, res: Response) => {
    try {
        const equipmentId = req.body.equipmentId;
        const result = await checkoutEquipment(equipmentId, req.user);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to check out equipment' });
    }
};
