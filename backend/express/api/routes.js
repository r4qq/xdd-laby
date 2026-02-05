import express from "express"

const router = express.Router();

import {getCategories, getUsers, getAds, addAd} from './actions.js'


router.get('/categories', getCategories);
router.get('/users', getUsers);
router.get('/ads', getAds);
router.post('/ads', addAd);

export default router;
