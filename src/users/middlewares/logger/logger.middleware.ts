import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;
    console.log(accessToken)

    if (accessToken) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }

    next();
  }
}
