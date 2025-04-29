import { Enterprise } from "../../enterprise/models/enterprise";
import { EnterpriseRepository } from "../repositories/enterprise-repository";

export class EnterpriseRepositoryMemory implements EnterpriseRepository {
    private readonly enterprises: Enterprise[] = [];

    async create(enterprise: Enterprise): Promise<Enterprise> {
        this.enterprises.push(enterprise);
        
        return enterprise;
    }
}