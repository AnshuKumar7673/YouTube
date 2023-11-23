import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";


import {upload} from "../middlewares/multere.middleware.js"
const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avitar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }

    ]),
    registerUser)

export default router