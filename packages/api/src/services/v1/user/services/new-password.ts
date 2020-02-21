import { INewPasswordRequest, IUser } from '@accelerate-starter/core';
import { Application } from '@feathersjs/express';
import { Request, Response } from 'express';
import moment from 'moment';

import logger from '../../../../logger';

export default (app: Application) => async (req: Request, res: Response) => {
  const requestBody: INewPasswordRequest = req.body;

  if (requestBody) {
    try {
      const dbUsers: IUser[] = await app.service('v1/user').find({
        query: {
          resetKey: requestBody.resetKey
        }
      });

      if (!dbUsers || dbUsers.length !== 1) {
        return res.status(403).json({
          message: 'Error with new password.'
        });
      }

      const { resetKeyDate, _id } = dbUsers[0];

      if (resetKeyDate) {
        const minutesDifference = Math.abs(
          moment(resetKeyDate).diff(new Date(), 'minutes')
        );

        if (minutesDifference > 2) {
          return res.status(401).json({
            message:
              'Your reset token has expired. Please try resetting your password again.'
          });
        }

        await app
          .service('v1/user')
          .patch(_id, { password: requestBody.password }, {});

        return res.json({
          message: 'Successfully reset password.'
        });
      }
    } catch (e) {
      logger.error('Error with verification.');
    }
  }

  return res.status(500).json({
    message: 'Error with verification.'
  });
};
