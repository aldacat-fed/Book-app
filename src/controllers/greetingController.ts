import { Request, Response } from "express"
import { AuthRequest } from "../middleware/verifyToken"

export const greetingSpecific = async (req: AuthRequest, res: Response) => {
    const name = req.user?.username

    res.json({message: `Hello ${name}, welcome!`})
}