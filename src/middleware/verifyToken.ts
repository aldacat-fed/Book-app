import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
    user?: { id: string; username: string; is_admin: boolean };
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log(req.cookies.accessToken)
  if (req.cookies.accessToken === undefined) {
    res.status(401).send()
    return
  }

  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET || "", (error: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
    if (error) {
      res.status(403).send()
      return
    }

    req.user = decoded as { id: string; username: string; is_admin: boolean };
    next() // makes the request move on to the next step in the process, in this case move on to greetingSpecific
  })
}
