import { Injectable } from "@nestjs/common";
import { SectorRepository } from "../repositories/sector-repository";
import { PrismaService } from "./prisma.service";
import { Sector } from "src/sector/models/sector";

@Injectable()
export class SectorRepositoryPrisma implements SectorRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(name: string, enterpriseId: string): Promise<Sector> {
        const sector = await this.prisma.sector.create({
            data: {
                name,
                enterprise_id: enterpriseId,
            },
        });

        return new Sector(sector.id, sector.name, sector.enterprise_id);
    }

    async findAllByEnterpriseId(enterpriseId: string): Promise<Sector[]> {
        const sectors = await this.prisma.sector.findMany({
            where: {
                enterprise_id: enterpriseId,
            },
        });

        return sectors.map(
            (sector) => new Sector(sector.id, sector.name, sector.enterprise_id),
        );
    }

    async findByNameAndEnterpriseId(name: string, enterpriseId: string): Promise<Sector | null> {
        const sector = await this.prisma.sector.findFirst({
            where: {
                name,
                enterprise_id: enterpriseId,
            },
        });

        if (!sector) {
            return null;
        }

        return new Sector(sector.id, sector.name, sector.enterprise_id);
    }
}