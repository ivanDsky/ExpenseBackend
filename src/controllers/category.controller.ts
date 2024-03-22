import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

const categoryService = new CategoryService();

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    const { name, color } = req.body;
    try {
        const category = await categoryService.createCategory((req as any).userGroup, name, color);
        res.status(201).json(category);
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const update = req.body;
    try {
        const updatedCategory = await categoryService.updateCategory(id, update);
        if (!updatedCategory) {
            res.status(404).json({ message: 'Category not found.' });
            return;
        }
        res.json(updatedCategory);
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await categoryService.deleteCategory(id);
        res.status(204).end();
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const category = await categoryService.getCategoryById(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
            return;
        }
        res.json(category);
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message });
    }
}
