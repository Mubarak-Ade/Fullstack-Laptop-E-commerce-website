import { RequestHandler } from 'express';

export const controllerName : RequestHandler = async (req, res, next): Promise<void> => {
  try {
    // logic
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};