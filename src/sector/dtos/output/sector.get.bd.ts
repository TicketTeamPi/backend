export class SectorGetBD {
  id: string;
  name: string;
  enterpriseId: string;

  constructor(id: string, name: string, enterpriseId: string) {
    this.id = id;
    this.name = name;
    this.enterpriseId = enterpriseId;
  }
}