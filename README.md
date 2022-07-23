# Netflix Lite™
A not-quite-as-sophisticated attempt at how Netflix / Youtube stream their video content for wide-spread consumption.

## That's cool and all, but how?

I'm going to break this down into multiple stages, each of increasing complexity in their methodology and implementation; with the aim being that at the end of this both you ☝ and I 👇 have a better understanding of how video streaming is done by these video wizards.

## Stages

### The Barebones basic y'all
What this approach is about is all in the title, we'll be implementing a basic React SPA that streams video in from a URL (S3 Bucket in my case) directly via the HTML5✨ video player. The major upgrade here on the existing video player functionality is that there'll be the option to select differing qualities of the same video with no major disruption to the playing video _pending a good internet connection that is_. 