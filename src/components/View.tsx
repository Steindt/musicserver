import styles from './view.module.css';
import { PlaylistBase } from '@/types';
import { addToQueue, play } from '@/API';
import ViewTrack from './view_items/ViewTrack';
import { SimplifiedAlbum, Track } from '@spotify/web-api-ts-sdk';
import { pickProp } from './Browse';
import ViewPlaylist from './view_items/ViewPlaylist';
import ViewAlbum from './view_items/ViewAlbum';
import { toast } from './toast.tsx';

export interface trackProp {
  track: Track;
  func: (uri: string) => void;
  showButton?: boolean;
}

export interface playlistProp {
  playlist: PlaylistBase;
  func: (uri: string) => void;
}

export interface albumProp {
  album: SimplifiedAlbum;
  func: (uri: string) => void;
}

export default function View({ props }: pickProp) {

  const addToQueueHandler = (uri: string) => {
    toast.add("Track added to queue");
    addToQueue(uri);
  }

  const playHandler = (uri: string) => {
    toast.add("Cleared queue and started playing");
    play(uri);
  } 

  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Tracks</h3>
        {props?.tracks?.items.map((track: Track, index: number) =>
          <ViewTrack key={index} track={track} func={addToQueueHandler} />
        )}
      </div>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Playlists</h3>
        {props?.playlists?.items.map((playlist: PlaylistBase, index: number) =>
          <ViewPlaylist key={index} playlist={playlist} func={playHandler} />
        )}
      </div>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Albums</h3>
        {props?.albums?.items.map((album: SimplifiedAlbum, index: number) =>
          <ViewAlbum key={index} album={album} func={playHandler} />
        )}
      </div>
    </div>
  );
}