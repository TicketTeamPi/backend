import { SectorGetBD } from "../../sector/dtos/output/sector.get.bd";
import { Sector } from "../../sector/models/sector";


export abstract class SectorRepository {
    abstract create(name: string, enterpriseId: string): Promise<Sector>;
    abstract findAllByEnterpriseId(enterpriseId: string): Promise<SectorGetBD[]>;
    abstract findByNameAndEnterpriseId(name: string, enterpriseId: string): Promise<SectorGetBD | null>;
}