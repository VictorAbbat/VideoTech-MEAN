import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})

export class AddVideoComponent implements OnInit {
  video: Video;

  constructor(private videoService: VideoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.video = new Video();
  }
  // Enregistrement de la video
  save() {
    this.videoService.createVideo(this.video)
      // Message de log
      .subscribe((message: Message) => {
        console.log(message);
        let video = message.videos[0];
        let msg = "Succes -> Video enregistré: "
          + "<ul>"
          + "<li>Id: " + video._id + "</li>"
          + "<li>Title: " + video.title + "</li>"
          + "<li>Genre: " + video.genre + "</li>"
          + "<li>Description: " + video.description + "</li>"
          + "<li>Year: " + video.year + "</li>"
          + "</ul>";

        this.messageService.add(msg);
      }, error => {
        console.log(error);
        let msg = "Erreur -> Echec enregistrement:"
          + "<ul>"
          + "<li>Id = " + this.video._id + "</li>"
          + "<li>Title = " + this.video.title + "</li>"
          + "<li>Genre = " + this.video.genre + "</li>"
          + "<li>Description = " + this.video.description + "</li>"
          + "<li>Year = " + this.video.year + "</li>"
          + "</ul>";

        this.messageService.add(msg);
      });
  }

  reset() {
    this.video = new Video();
  }

  onSubmit() {
    this.save();
    this.reset();
  }
}


