import { Router, Express } from "express";
import ReportController from "../controllers/report";
import FilterController from "../controllers/filter";
import { Connection } from "mysql2/promise";

const initRouter = async (app: Express) => {
    try {
        const router = Router()
        const reportController = new ReportController()
        const filterController = new FilterController()

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