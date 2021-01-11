//Les 4 URL pour Nodejs avec MongoDB
module.exports = function (app) {

  var videos = require('../controllers/video.controller.js');

  // Creer une video
  app.post('/api/video/create', videos.create);

  // Retrouver toutes les videos
  app.get('/api/video/retrieveinfos', videos.findall);

  // Mettre a jour la video avec Id
  app.put('/api/video/updatebyid/:id', videos.update);

  // Supprimer la video avec Id
  app.delete('/api/video/deletebyid/:id', videos.delete);
}
