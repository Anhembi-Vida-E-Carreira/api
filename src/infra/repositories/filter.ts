import { IFilter } from "../../domain/entities/filter";
import { IFilterRepository } from "../../domain/repositories/filter";
import { Database as database } from "../db/connection";

export default class FilterRepository implements IFilterRepository {
    constructor (){}

    private toModel (data: any): IFilter {
        return {
            id: data.idFiltro,
            type: data.tipoFiltro,
            name: data.nomeFiltro  
        }
    }

    async getAll (): Promise<IFilter[]>{
        const data = await database.query('select * from filtros')
        const filtros : IFilter[]= []
        data.forEach((filtro: any) => {filtros.push(this.toModel(filtro))})
        return filtros
    }
}