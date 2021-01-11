import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { MessageService } from '../message.service';
import { Message } from '../message';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})

export class ListVideosComponent implements OnInit {

  videos: Array<Video> = [];
  showVideo: Video;
  isSelected: boolean = false;
  deletedVideo: Video;
  returnedMessage: string;

  constructor(private videoService: VideoService, private messageService: MessageService) { }

  setVideoDetails(video: Video) {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.showVideo = video;
    } else {
      this.showVideo = undefined;
    }
  }

  prepareDeleteVideo(deleteVideo: Video) {
    // Recupere la video a delete
    this.deletedVideo = deleteVideo;
    // Reset du message retourné
    this.returnedMessage = undefined;
  }

  // Delete la video
  deleteVideo() {
    console.log("--- Fonction deleteVideo");

    this.videoService.deleteVideo(this.deletedVideo._id)
      .subscribe((message: Message) => {
        console.log(message);
        // Supprime deletedVideo de la liste de videos
        this.videos = this.videos.filter(video => {
          return video._id != this.deletedVideo._id;
        })

        // Message a retourner
        this.returnedMessage = message.message;
        // Reset showVideo pour ne pas l'afficher
        this.showVideo = undefined;
        // Ajout du message de suppression
        this.messageService.add(message.message);
      },
        (error) => {
          console.log(error);
          let errMsg: string = "Erreur details: " + error;
          this.messageService.add(errMsg);
        });
  }

  // Update la video
  updateVideo() {
    this.videoService.updateVideo(this.showVideo)
      .subscribe((message: Message) => {
        console.log(message);
        // Update la liste de videos
        this.videos.map(x => {
          if (x._id == this.showVideo._id) {
            x = this.showVideo;
          }
        });
        let msg: string = "Update reussi -> Nouvelles proprietés: <br>"
          + "<ul>"
          + "<li>" + "id: " + this.showVideo._id + "</li>"
          + "<li>" + "title: " + this.showVideo.title + "</li>"
          + "<li>" + "genre: " + this.showVideo.genre + "</li>"
          + "<li>" + "description: " + this.showVideo.description + "</li>"
          + "<li>" + "year: " + this.showVideo.year + "</li>"
          + "</ul>";
        this.messageService.add(msg);
      }
        , (error) => {
          console.log(error);
          let errMsg = "Update echec -> Erreur = " + error;
          this.messageService.add(errMsg);
        });
  }

  // Recupere toutes les video en Db
  retrieveAllVideos() {
    this.videoService.retrieveAllVideos()
      .subscribe((message: Message) => {
        console.log(message);
        this.videos = message.videos;
      }
        , (error) => {
          console.log(error);
        });
  }

  ngOnInit(): void {
    this.retrieveAllVideos();
  }
}
