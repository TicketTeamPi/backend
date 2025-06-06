import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SectorService } from "../service/sector.service";

@UseGuards(AuthGuard('jwt'))
@Controller('sector')
export class SectorController {
    constructor(private readonly _sectorService: SectorService) {}

    @Get()
    async findAllByEnterpriseId(enterpriseId: string) {
        const sectors = await this._sectorService.findAllByEnterpriseId(enterpriseId);
        return sectors.map(sector => ({
            id: sector.id,
            name: sector.name,
            enterpriseId: sector.enterpriseId
        }));
    }
}