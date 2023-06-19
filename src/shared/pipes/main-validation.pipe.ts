import { ValidationPipe } from '@nestjs/common';
export const MainValidationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  stopAtFirstError: true,
  forbidNonWhitelisted: true,
});
