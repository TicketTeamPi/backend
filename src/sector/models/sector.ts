import { randomUUID } from "crypto";

export class Sector {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _enterpriseId: string;

  constructor(name: string, enterpriseId: string, id?: string) {
    this._id = id ? id : randomUUID();
    this._name = name;
    this._enterpriseId = enterpriseId;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get enterpriseId(): string {
    return this._enterpriseId;
  }
}
