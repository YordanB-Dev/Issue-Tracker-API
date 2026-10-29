import issuseRepository from "../repositories/issueRepository.js";
import { AppError } from "../../utils/AppError.js";


interface Issue {
    id: number,
    user_id: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    created_by: number,
    assigned_to: number | null,
    created_at: Date,
    due_date: Date;   
}

interface UpdateIssueData {
    title?: string,
    description?: string,
    status?: string,
    priority?: string,
    assigned_to?: number | null,
    due_date?: string | Date | undefined
}

const isValidateDate = (value: string | Date): boolean => {
    return !Number.isNaN(new Date(value).getTime());
}

export const issueService = {

async getAllIssues(user_id: number, status?: string, priority?: string) {

    const allowedStatus = [
        "open",
        "in_progress",
        "resolved",
        "closed"
    ];

    const allowedPriority = [
        "low",
        "medium",
        "high"
    ];

    if (status && !allowedStatus.includes(status)) {
        throw new AppError("Invalid status", 400);
    };

    if (priority && !allowedPriority.includes(priority)) {
        throw new AppError("Invalid priority", 400);
    };

    const result = await issuseRepository.getAllIssues(user_id, status, priority);

    return result;
},

    async getIssueById(id: number, user_id: number) {
        const result = await issuseRepository.getIssuesById(id, user_id);
        if (!result) {
            throw new AppError("Issue not found", 404);
        }

        return result;
    },


    async createIssue(title: string, description: string, status: string, priority: string, created_by: number, assigned_to: number | null) {

        const allowedStatus = [
            "open",
            "in_progress",
            "resolved",
            "closed"
        ];

        const allowedPriority = [
            "low",
            "medium",
            "high"
        ];

        if (!title || title.trim().length === 0) {
            throw new AppError("Invalid title", 400);
        }

        if (!description || description.trim().length === 0) {
            throw new AppError("Invalid description", 400);
        }

        if (status && !allowedStatus.includes(status)) {
            throw new AppError("Invalid status", 400);
        }

        if (priority && !allowedPriority.includes(priority)) {
            throw new AppError("Invalid priority", 400);
        }

        const result = await issuseRepository.createIssue(title, description, status, priority, created_by, assigned_to);

        if (!result) {
            throw new AppError("Invalid issue", 400);
        }

        return result;
    },


    async updateIssue(user_id: number, id: number, updateData: UpdateIssueData) {

        if (Object.keys(updateData).length === 0) {
            throw new AppError("Invalid data", 400);
        }

        const allowedFields = [
            "title",
            "description",
            "status",
            "priority",
            "due_date",
            "assigned_to"
        ];

        const allowedStatus = [
            "open",
            "in_progress",
            "resolved",
            "closed"
        ];

        const allowedPriority = [
            "low",
            "medium",
            "high"
        ];

        const hasInvalidFields = Object.keys(updateData).some((field) => {
            return !allowedFields.includes(field);
        });

        if (hasInvalidFields) {
            throw new AppError("Invalid field", 400);
        }

        if (updateData.title?.trim().length === 0) {
            throw new AppError("Invalid title", 400);
        };

        if (updateData.description?.trim().length === 0) {
            throw new AppError("Invalid description", 400);
        };

        if (updateData.status !== undefined && !allowedStatus.includes(updateData.status)) {
            throw new AppError("Invalid status", 400);
        };

        if (updateData.priority !== undefined && !allowedPriority.includes(updateData.priority)) {
            throw new AppError("Invalid priority", 400);
        };

        if (updateData.due_date !== undefined && !isValidateDate(updateData.due_date)) {
            throw new AppError("Invalid due date", 400);
        }

        const { due_date, ...issueData } = updateData;
        const sanitizedDate = {
            ...issueData,
            ...(due_date !== undefined ? { due_date: new Date(due_date) } : {})
        };

        const issue = await issuseRepository.updateIssue(user_id, id, sanitizedDate);

        if (!issue) {
            throw new AppError("Issue not found", 404);
        }

        return issue;
    },

    async deleteIssue(user_id: number, id: number) {
        const issue = await issuseRepository.deleteIssue(user_id, id);

        if (!issue) {
            throw new AppError("Issue not found", 404);
        }

        return issue;
    }
};

export default issueService;