import express from "express"
const router = express.Router()
import * as auth from "../controllers/auth.js"

// routes
router.get("/", auth.welcome)
  
export default router; 