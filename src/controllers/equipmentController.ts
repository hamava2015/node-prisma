import { Request, Response } from 'express';
import { addEquipment, getEquipments, checkoutEquipment, returnEquipment } from '../services/equipmentService';
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
        const { type, location } = req.body;
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

export const ret = async (req: any, res: Response) => {
    const { equipmentId, returnLocation } = req.body;
    const { user_id } = req.user;

    console.log('return location: ', returnLocation);

    if (!returnLocation) {
        return res.status(400).json({ error: 'Return location required.' });
    }

    const result = await returnEquipment(
        equipmentId,
        returnLocation,
        user_id
    );

    if (result.status === 200) {
        res.json({ message: result.message });
    } else {
        res.status(result.status).json({ error: result.error });
    }
};
