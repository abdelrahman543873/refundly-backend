import { Model, ModelCtor } from 'sequelize-typescript';
import { MakeNullishOptional } from 'sequelize/types/utils';

export abstract class BaseRepository<Entity extends Model> {
  constructor(protected readonly model: ModelCtor<Entity>) {}

  create(data: MakeNullishOptional<Entity>): Promise<Entity> {
    return this.model.create(data);
  }

  addMany(data: MakeNullishOptional<Entity>[]): Promise<Entity[]> {
    return this.model.bulkCreate(data);
  }
}
