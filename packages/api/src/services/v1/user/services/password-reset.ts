import v1 from 'uuid/v1';

import { v1UserModel } from '@accelerate-starter/core';

import logger from '../../../../logger';
import { sendPasswordResetMail } from '../../../../mailer';

export default () => async (req, res) => {
  try {
    const { email } = req.body;

    const user = await v1UserModel.findOne({ email });

    if (user && req.headers && req.headers.origin) {
      user.resetKey = v1();
      user.resetKeyDate = new Date();

      await user.save();

      const resetPath = `/new-passphrase?key=${user.resetKey}`;

      await sendPasswordResetMail({
        resetPath,
        origin: req.headers.origin,
        name: user.name || 'there',
        to: user.email
      });

      return res.json({
        message: 'Successfully sent reset email.'
      });
    }
  } catch (e) {
    logger.error({ e });
  }

  return res.status(500).json({
    message: 'Error with password reset.'
  });
};
