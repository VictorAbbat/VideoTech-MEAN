const Video = require("../models/video.model.js");

exports.create = (req, res) => {
  const video = new Video({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    year: req.body.year
  });
  // Sauvegarder la video dans MongoDB
  video.save().then(data => {
    // Envoi du message de confirmation au client
    res.status(200).json({
      message: "La vidéo " + data.id + " a bien été enregistrée dans MongoDB",
      video: data
    });
  }).catch(err => {
    res.status(500).json({
      message: "Echec",
      error: err.message
    });
  });
};


exports.findall = (req, res) => {
  Video.find().select('-__v').then(videoInfos => {
    res.status(200).json({
      message: "Les vidéos ont été récupérées",
      numberOfVideos: videoInfos.length,
      videos: videoInfos
    });
  }).catch(error => {
    // log on console
    console.log(error);
    res.status(500).json({
      message: "Echec",
      error: error
    });
  });
};


exports.delete = (req, res) => {
  let videoId = req.params.id
  Video.findByIdAndRemove(videoId).select('-__v -_id')
    .then(video => {
      if (!video) {
        res.status(404).json({
          message: "La vidéo " + videoId.id + " n'existe pas",
          error: "404",
        });
      }
      res.status(200).json({
        message: "La vidéo " + videoId.id + " a été supprimée",
        video: video,
      });
    }).catch(err => {
      return res.status(500).send({
        message: "Echec, la vidéo " + videoId.id + " n'a pas été supprimée",
        error: err.message
      });
    });
};


exports.update = (req, res) => {
  Video.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      year: req.body.year,
    },
    { new: true }
  ).select('-__v')
    .then(video => {
      if (!video) {
        return res.status(404).send({
          message: "La vidéo " + req.params.id + " n'existe pas",
          error: "Echec"
        });
      }
      res.status(200).json({
        message: "La vidéo " + req.params.id + " a bien été mise à jour",
        video: video,
      });
    }).catch(err => {
      return res.status(500).send({
        message: "Echec, la vidéo " + req.params.id + " n'a pas été mise à jour",
        error: err.message
      });
    });

};