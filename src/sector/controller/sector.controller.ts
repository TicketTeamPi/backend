import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SectorService } from "../service/sector.service";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

@UseGuards(AuthGuard('jwt'))
@Controller('sector')
export class SectorController {
    constructor(private readonly _sectorService: SectorService) {}

    @Get()
    async findAllByEnterpriseId(@Req() req) {
        const token = req.cookies.jwt;
        const decodifyToken = jwt.verify(token, fs.readFileSync('./public.key', 'utf8'), { algorithms: ['RS256'] });
        const sectors = await this._sectorService.findAllByEnterpriseId(decodifyToken['enterpriseId']);
        return sectors.map(sector => ({
            id: sector.id,
            name: sector.name,
            enterpriseId: sector.enterpriseId
        }));
    }
}