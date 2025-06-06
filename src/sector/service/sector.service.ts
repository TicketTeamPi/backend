import { Injectable } from "@nestjs/common";
import { SectorRepository } from "src/database/repositories/sector-repository";

@Injectable()
export class SectorService {
    constructor(private readonly _sectorRepository: SectorRepository) {}

    async findAllByEnterpriseId(enterpriseId: string) {
        const sectors = await this._sectorRepository.findAllByEnterpriseId(enterpriseId);
        return sectors;
    }
}