import type { Request, Response } from 'express';
import User from '../models/User';

export const fetchAllUsers = async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const sort = req.query.sort as string;

    try {
        function escapeRegex(str: string) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //hantera specialtecken så ej oväntade matchningar
        }

        let filter: {} = {};
        if (search) {
            filter = {
                username: { $regex: escapeRegex(search), $options: 'i' },
            };
        }

        let sortOrder: {} = {};
        if (
            sort &&
            (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc')
        ) {
            sortOrder = { username: sort };
        }

        const users = await User.find(filter)
            .sort(sortOrder)
            .select('-password');
        res.json(users);
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

export const fetchUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { username, is_admin } = req.body;

    if (username === undefined && is_admin === undefined) {
        res.status(400).json({ error: 'Username or is_admin is required' });
        return;
    }

    try {
        const updatedFields: Partial<{ username: string; is_admin: boolean }> =
            {};
        if (username !== undefined) updatedFields.username = username;
        if (is_admin !== undefined) updatedFields.is_admin = is_admin;

        const result = await User.updateOne(
            { _id: id },
            { $set: updatedFields },
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json({ message: 'User updated' });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        const result = await User.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted', result: result });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};
