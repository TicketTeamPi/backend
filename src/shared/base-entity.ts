import { randomUUID } from 'crypto';

export class BaseEntity {
  private readonly _id: string;
  private readonly _created_at: Date;
  private readonly _updated_at?: Date;

  constructor() {
    this._id = randomUUID();
    this._created_at = new Date();
  }

  get id(): string {
    return this._id;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date | undefined {
    return this._updated_at;
  }
}
