import { BaseEntity } from '../../shared/base-entity';

export class Ticket extends BaseEntity {
  constructor(
    private readonly _title: string,
    private readonly _description: string,
    private readonly _status: string,
    private readonly _responsibleId: string,
    id: string | null = null,
  ) {
    super(id);
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get status(): string {
    return this._status;
  }

  get responsibleId(): string {
    return this._responsibleId;
  }
}
