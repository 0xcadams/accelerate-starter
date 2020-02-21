import { IUser } from '@accelerate-starter/core';
import { Application } from '@feathersjs/express';
import { Request, Response } from 'express';

import logger from '../../../../logger';

export default (app: Application) => async (req: Request, res: Response) => {
  const { verifyKey } = req.body;

  if (verifyKey) {
    try {
      const dbUsers: IUser[] = await app
        .service('v1/user')
        .find({ query: { verifyKey } });

      if (!dbUsers || dbUsers.length !== 1) {
        return res.status(403).json({
          message: 'Error with verification.'
        });
      }

      await app
        .service('v1/user')
        .patch(dbUsers[0]._id, { verifyKey, verified: true }, {});

      return res.json({
        message: 'Successfully verified.'
      });
    } catch (e) {
      logger.error('Error with verification.');
    }
  }

  return res.status(500).json({
    message: 'Error with verification.'
  });
};
