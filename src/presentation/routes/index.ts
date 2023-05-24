import { Router, Express } from "express";
import ReportController from "../controllers/report";
import { ReportService } from "../../application/services/report";
import { connect } from "../../infra/db/connection";
import { ReportRepository } from "../../infra/repositories/report";
import { PhotoRepository } from "../../infra/repositories/photo";
import FilterRepository from "../../infra/repositories/filter";
import FilterController from "../controllers/filter";

const initRouter = async (app: Express) => {
    try {
        const router = Router()
        const connection = await connect();
        const reportRepository = new ReportRepository(connection!)
        const photoRepository = new PhotoRepository(connection!)
        const filterRepository = new FilterRepository(connection!)
        const reportService = new ReportService(reportRepository, photoRepository)
        const reportController = new ReportController(reportService)
        const filterController = new FilterController(filterRepository)

        router.post('/report', reportController.create)
        router.put('/report', reportController.update)
        router.get('/report', reportController.get)
        router.get('/report/filtered', reportController.getByFilter)
        router.get('/filters', filterController.get)
        app.use(router)

    } catch (err) {
        console.error(err)
    }
}

export default initRouter


