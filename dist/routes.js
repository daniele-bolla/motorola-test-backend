import { register } from './controller/Auth.js';
import { Router } from 'express';
const router = Router();
router.post("/auth/register", register);
router.get("/auth/register", (req, res) => {
    res.send('Hello World!');
});
export default router;
//# sourceMappingURL=routes.js.map