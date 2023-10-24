import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Prisma, Equipment } from '@prisma/client'
import { IEquipmentRequestBody, EquipmentType } from '../interfaces/equipment';

const prisma = new PrismaClient();

export const addEquipment = async (req: any, res: Response) => {
    try {
        const { name, type, location, status } = req.body as IEquipmentRequestBody;

        if (!EquipmentType[type]) {
            return res.status(400).json({ error: 'Invalid equipment type' });
        }

        // if (!EquipmentStatus[status]) {
        //     return res.status(400).json({ error: 'Invalid equipment status' });
        // }

        // Check if the "Unassigned" job exists, or create it if not
        let unassignedJob = await prisma.job.findFirst({
            where: { job_name: 'Unassigned' },
        });

        if (!unassignedJob) {
            unassignedJob = await prisma.job.create({
                data: { job_name: 'Unassigned' },
            });
        }

        const equipment = await prisma.equipment.create({
            data: {
                name,
                type,
                location,
                equipmentLogs: {
                    create: {
                        checkout_date: new Date(),
                        status: 'Available',
                        user_id: req.user.user_id,
                        job_id: unassignedJob.job_id,
                    },
                },
            },
        });

        res.json(equipment);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

export const getEquipments = async (req: any, res: Response) => {
    try {
        const { type, location } = req.body;

        console.log("type: ", req.body);

        const query: any = {
            select: {
                equipment_id: true,
                name: true,
                type: true,
                location: true,
                equipmentLogs: {
                    select: {
                        status: true,
                    },
                    orderBy: {
                        checkout_date: 'desc',
                    },
                    take: 1,
                },
            },
        }

        if (type) {
            query.where = { type }
        }

        if (location) {
            query.where = { location }
        }

        const equipmentList = await prisma.equipment.findMany(query);

        res.json(equipmentList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve equipment list' });
    }
};
