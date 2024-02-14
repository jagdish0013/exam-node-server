const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");
const subjectController = require("../controllers/subject.controller");
const examController = require("../controllers/exam.controller");
const userController = require("../controllers/user.controller");

 

router.post("/api/auth/signup",[
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  router.post("/api/auth/signin", controller.signin);
  
  router.post("/api/auth/signout", controller.signout);

  // User Api

  router.post("/api/user/add", [authJwt.verifyToken], userController.add);

  router.post("/api/user/list", [authJwt.verifyToken], userController.list);

  router.delete("/api/user/delete/:id", [authJwt.verifyToken], userController.deleteData);
 
  // Subject Api

  router.post("/api/subject/add", [authJwt.verifyToken], subjectController.add);
  
  router.post("/api/subject/list", [authJwt.verifyToken], subjectController.list);
  
  router.get("/api/subject/one/:id", [authJwt.verifyToken], subjectController.fatchOne);
  
  router.get("/api/subject/count", subjectController.count);

  router.put("/api/subject/update", [authJwt.verifyToken], subjectController.update);

  router.post("/api/subject/search", subjectController.search);

  router.delete("/api/subject/delete/:id", [authJwt.verifyToken], subjectController.deleteData);


// Exam api
  router.post("/api/exam/add", [authJwt.verifyToken], examController.add);
  
  router.post("/api/exam/list", [authJwt.verifyToken], examController.list);
  
  router.get("/api/exam/one/:id", [authJwt.verifyToken], examController.fatchOne);
  
  router.get("/api/exam/count", examController.count);

  router.put("/api/exam/update", [authJwt.verifyToken], examController.update);

  router.post("/api/exam/search", examController.search);

  router.delete("/api/exam/delete/:id", [authJwt.verifyToken], examController.deleteData);

  module.exports = router;
  










