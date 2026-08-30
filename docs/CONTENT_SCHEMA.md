# Content & Asset Schema

The website should be content-driven so memories can be added without rewriting components.

## Memory event

```ts
interface MemoryEvent {
  id: string;
  date: string;
  title: string;
  shortNote?: string;
  coverImage: string;
  photos: string[];
  video?: string;
  audio?: string;
  clue?: string;
  keyword?: string;
}
```

## Gallery item

```ts
interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  date?: string;
}
```

## Song

```ts
interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  keyword?: string;
  clue?: string;
}
```

## Video

```ts
interface VideoMessage {
  id: string;
  title: string;
  speaker?: string;
  src: string;
  poster?: string;
  category?: 'main' | 'family' | 'friends';
}
```

## Suggested asset structure

```text
public/
  photos/
    gallery/
    timeline/
  music/
  videos/
  illustrations/
  textures/
```

Do not commit secrets. Do not commit an entire unprocessed personal media library simply because it is available. Add final, optimized assets intentionally.
