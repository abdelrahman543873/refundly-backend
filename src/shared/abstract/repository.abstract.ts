import { Model } from 'sequelize-typescript';

export abstract class BaseRepository<Entity> {
  constructor(protected readonly model: typeof Model<Entity>) {}

  create(data: Partial<Entity>): Promise<Entity> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return this.model.create({ ...data });
  }
}
