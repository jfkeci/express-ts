import { HttpException } from '@nestjs/common';
import mongoose from 'mongoose';

export const isValidId = (id: string): boolean => {
  if (!id) return false;

  if (!mongoose.Types.ObjectId.isValid(id)) return false;

  return true;
};

export const validateId = (id: string): void => {
  if (!id) throw new HttpException('Missing id', 400);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpException('Invalid id', 409);
  }
};
