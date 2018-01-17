// all routes for application

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
  });
}
