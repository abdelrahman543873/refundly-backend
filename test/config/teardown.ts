import { INestApplication } from '@nestjs/common';
export default async function (): Promise<void> {
  await (<INestApplication>global.app).close();
}
