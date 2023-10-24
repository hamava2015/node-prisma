import { Prisma, PrismaClient } from '@prisma/client';
import { IEquipmentRequestBody, EquipmentType } from '../interfaces/equipment';

const prisma = new PrismaClient();

export const addEquipment = async (data: IEquipmentRequestBody, user: any) => {
    try {
        const { name, type, location } = data;

        if (!EquipmentType[type]) {
            throw new Error('Invalid equipment type');
        }

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
                        user_id: user.user_id,
                        job_id: unassignedJob.job_id,
                    },
                },
            },
        });

        return equipment;
    } catch (error) {
        throw error;
    }
};

export const getEquipments = async (type?: string, location?: string) => {
    try {
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
        };

        if (type) {
            query.where = { type };
        }

        if (location) {
            query.where = { location };
        }

        const equipmentList = await prisma.equipment.findMany(query);

        return equipmentList;
    } catch (error) {
        throw error;
    }
};

export const checkoutEquipment = async (equipmentId: number, user: any) => {
    try {
        const equipment = await prisma.equipment.findUnique({
            where: { equipment_id: equipmentId },
        });

        if (!equipment) {
            throw new Error('Equipment not found');
        }

        const lastLogEntry = await prisma.equipmentLog.findFirst({
            where: {
                equipment_id: equipmentId,
            },
            orderBy: {
                checkout_date: 'desc',
            },
        });

        if (!lastLogEntry) {
            throw new Error('Internal error');
        }

        if (lastLogEntry.status === 'Available') {
            await prisma.equipmentLog.create({
                data: {
                    checkout_date: new Date(),
                    status: 'CheckedOut',
                    user_id: user.user_id,
                    equipment_id: equipmentId,
                    job_id: lastLogEntry.job_id,
                },
            });

            return { message: 'Equipment checked out successfully' };
        } else {
            throw new Error('Equipment is already checked out');
        }
    } catch (error) {
        throw error;
    }
};


export async function returnEquipment(
    equipmentId: number,
    returnLocation: string,
    userId: number
) {
    try {
        const equipment = await prisma.equipment.findUnique({
            where: { equipment_id: equipmentId },
        });

        if (!equipment) {
            return { status: 404, error: 'Equipment not found' };
        }

        const lastLogEntry = await prisma.equipmentLog.findFirst({
            where: {
                equipment_id: equipmentId,
            },
            orderBy: {
                checkout_date: 'desc',
            },
        });

        if (!lastLogEntry) {
            return { status: 500, error: 'Internal error' };
        }

        if (lastLogEntry.status === 'CheckedOut') {
            await prisma.equipmentLog.create({
                data: {
                    checkout_date: new Date(),
                    return_date: new Date(),
                    return_location: returnLocation,
                    status: 'Available',
                    user_id: userId,
                    equipment_id: equipmentId,
                    job_id: lastLogEntry.job_id,
                },
            });

            await prisma.equipment.update({
                where: { equipment_id: equipmentId },
                data: { location: returnLocation },
            });

            return { status: 200, message: 'Equipment returned successfully' };
        } else {
            return { status: 400, error: 'Equipment is not checked out' };
        }
    } catch (error) {
        console.error(error);
        return { status: 500, error: 'Failed to return equipment' };
    }
}
