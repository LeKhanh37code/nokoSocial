const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")


router.get('/search', auth, userCtrl.searchUser)

router.get('/user/:id', auth, userCtrl.getUser)

router.patch('/user', auth, userCtrl.updateUser)

router.patch('/user/:id/follow', auth, userCtrl.follow)
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow)
router.patch('/user/:id/dating', auth, userCtrl.dating)
router.patch('/user/:id/updating', auth, userCtrl.updating)
router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)



module.exports = router
