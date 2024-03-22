import { Category, ICategory } from '../models/categories/category';
import {IUserGroup} from "../models/users/usergroup";

export class CategoryService {
    createCategory(userGroup: IUserGroup, name: string, color: string): Promise<ICategory> {
        return new Promise(async (resolve, reject) => {
            try {
                const category = await Category.create({ userGroup, name, color });
                resolve(category);
            } catch (error) {
                reject({ status: 500, message: 'Failed to create category.' });
            }
        });
    }

    updateCategory(categoryId: string, update: Partial<ICategory>): Promise<ICategory | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedCategory = await Category.findByIdAndUpdate(categoryId, update, { new: true });
                resolve(updatedCategory);
            } catch (error) {
                reject({ status: 500, message: 'Failed to update category.' });
            }
        });
    }

    deleteCategory(categoryId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await Category.findByIdAndDelete(categoryId);
                resolve();
            } catch (error) {
                reject({ status: 404, message: 'Category not found.' });
            }
        });
    }

    getCategoryById(categoryId: string): Promise<ICategory | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const category = await Category.findById(categoryId);
                resolve(category);
            } catch (error) {
                reject({ status: 404, message: 'Category not found.' });
            }
        });
    }

    getAllCategories(): Promise<ICategory[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const categories = await Category.find();
                resolve(categories);
            } catch (error) {
                reject({ status: 404, message: 'Categories not found.' });
            }
        });
    }
}