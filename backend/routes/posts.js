import express from "express"
import * as controllers from "../controllers/posts.js"
const router = express.Router()
import auth from "../middleware/auth.js"

/* 
  [ 
    getPostsBySearch
    getPosts
    getPost
    createPost
    updatePost
    likePost
    deletePost
  ]
*/

router.get("/search", controllers.getPostsBySearch)
router.get("/", controllers.getPosts)
router.get("/:id", controllers.getPost)
router.post("/", auth, controllers.createPost)
router.patch("/:id", auth, controllers.updatePost)
router.delete("/:id", auth, controllers.deletePost)
router.patch("/:id/likePost", auth, controllers.likePost)

export default router
