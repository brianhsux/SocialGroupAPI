var express = require("express"),
    config  = require("../config"),
    middleware = require("../middleware"),
    initalizeDb = require("../db"),
    user = require("../controller/user"),
    account = require("../controller/account"),
    channel = require("../controller/channel"),
    message = require("../controller/message"),
    router = express();

//connect to db
initalizeDb(db => {
  //internal middleware
  // router.use(middleware);
  
  //api routes v1 (/v1)
  router.use('/user', user);
  router.use('/account', account);
  router.use('/channel', channel);
  router.use('/message', message);
  
  //internal middleware
//   router.use(middleware({ config, db }));
//   //api routes v1 (/v1)
//   router.use('/user', user({ config, db }));
//   router.use('/account', account({ config, db }));
//   router.use('/channel', channel({ config, db }));
//   router.use('/message', message({ config, db }));

});

module.exports = router;
// export default router;
