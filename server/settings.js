exports.dbConfig = {
    host: 'localhost',
    user: 'root',
    pass: '',
    database: 'kingpes',
    port: '3306'
  };
  
  exports.listenPort = 3000;

  /*
  * TAG NOTIFICATION FOR ADMIN
  */
 exports.notify_verify = "1";
 exports.notify_reset = "2";
 exports.notify_bought = "3";
 exports.notify_raiting = "4";
 exports.notify_comment = "5";
 exports.notify_error = "6";


    
  /*
  * TRANSACTION STATUS
  */
 exports.bought = 0;
 exports.processing = 1;
 exports.user_cancel = 2;
 exports.admin_cancel = 3;
 exports.complete = 4;
 exports.store = 5;

 exports.receiverGuest = 1;
 exports.receiverStore = 1;

 exports.user = 0;
 exports.admin = 1;
 exports.superadmin = 2;
 exports.supervisor = 3;


 exports.session = "session";

 exports.secret_key = "secret";

 exports.secret_encrypt = '12345';

 exports.secret_fail = '404';

