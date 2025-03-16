import { Component, signal } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { SumitModule } from '../../sumit.module';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SumitModule, SafeUrlPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  images: string[] = [
    'assets/YouTube Banner.png',
    'assets/logo.png',
    'assets/logos.png',
  ];

  private API_KEY = 'AIzaSyBD3TtFwXpLgvj19bCt8lnW3omCDWmCXfw'; // 🔑 Replace with your actual API key
  private CHANNEL_ID = 'UCqKiCjjFjo-kLrKG7fXwW7w'; // 🔗 Replace with your YouTube Channel ID
  private MAX_RESULTS = 10; // Number of videos to fetch

  youtubeVideos = signal<string[]>([]); // ✅ Signal for reactive state

  playlists = signal<
    { title: string; thumbnail: string; playlistId: string }[]
  >([]); // ✅ Store playlists

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.fetchYouTubeVideos();
    this.fetchPlaylists();

    this.route.url.subscribe(() => {
      // ✅ Reload data when route changes
      this.fetchPlaylists();
    });
  }

  fetchYouTubeVideos() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&channelId=${this.CHANNEL_ID}&part=snippet,id&order=date&maxResults=${this.MAX_RESULTS}`;

    this.http.get<any>(apiUrl).subscribe((response) => {
      if (response.items) {
        this.youtubeVideos.set(
          response.items.map(
            (item: any) => `https://www.youtube.com/embed/${item.id.videoId}`
          )
        );
      }
    });
  }

  fetchPlaylists() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${this.CHANNEL_ID}&maxResults=${this.MAX_RESULTS}&key=${this.API_KEY}`;

    this.http.get<any>(apiUrl).subscribe((response) => {
      if (response.items) {
        this.playlists.set(
          response.items.map((item: any) => ({
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            playlistId: item.id,
          }))
        );
      }
    });
  }
}
