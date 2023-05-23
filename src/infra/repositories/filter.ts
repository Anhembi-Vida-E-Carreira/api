import { Connection } from "mysql2/promise";
import { FilterTypes, IFilter } from "../../domain/entities/filter";
import { IFilterRepository } from "../../domain/repositories/filter";

export default class FilterRepository implements IFilterRepository {
    constructor (
        private readonly database: Connection
    ){}

    private toModel (data: any): IFilter {
        return {
            id: data.idFiltro,
            type: data.tipoFiltro,
            name: data.nomeFiltro  
        }
    }

    async getAll (): Promise<IFilter[]>{
        const data = await this.database.execute('select * from Filtros')
        const filtros : IFilter[]= []
        data.forEach(filtro => {filtros.push(this.toModel(filtro))})
        return filtros
    }
}