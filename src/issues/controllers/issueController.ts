import type { Request, Response } from "express";
import issueService from "../services/issueService.js";
import asyncHandler from "../../asyncHandler.js";

export const issueController = {

    getAll: asyncHandler(async(req: Request, res: Response) => {
        const created_by = (req as any).user.id;
        const status = req.query.status as string | undefined;
        const priority = req.query.priority as string | undefined;
        const result = await issueService.getAllIssues(created_by, status, priority);
        return res.status(200).json(result);
    }),

    getById: asyncHandler(async(req: Request, res: Response) => {
        const id = Number(req.params.id);
        const created_by = (req as any).user.id;
        const result = await issueService.getIssueById(id, created_by);
        return res.status(200).json(result);
    }),

    create: asyncHandler(async(req: Request, res: Response) => {
        const {title, description, status, priority, created_by, assigned_to} = req.body;
        const result = await issueService.createIssue(title, description, status, priority, created_by, assigned_to);
        return res.status(201).json(result);
    }),

    update: asyncHandler(async(req: Request, res: Response) => {
        const id = Number(req.params.id);
        const created_by = (req as any).user.id;
        const data = req.body;
        const result = await issueService.updateIssue(created_by, id, data);
        return res.status(200).json(result);
    }),

    delete: asyncHandler(async(req: Request, res: Response) => {
        const id = Number(req.params.id);
        const created_by = (req as any).user.id;
        const result = await issueService.deleteIssue(created_by, id);
        return res.status(201).json(result);
    })
};

export default issueController;