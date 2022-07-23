# Netflix Lite™
A not-quite-as-sophisticated attempt at how Netflix / Youtube stream their video content for wide-spread consumption.

## That's cool and all, but how?

I'm going to break this down into multiple stages, each of increasing complexity in their methodology and implementation; with the aim being that at the end of this both you ☝ and I 👇 have a better understanding of how video streaming is done by these video wizards.

## Stages

### #1 The Barebones Basic Approach
What this approach is all about can be found in the title, we'll be implementing a basic React SPA that streams video in from a URL (S3 Bucket in my case) directly via the HTML5✨ `video` element. The major upgrade here on the existing video player functionality is that there'll be the option to select differing qualities of the same video with no major disruption to the playing video _(pending a good internet connection that is)_.

#### What have we learnt?
When selecting between different qualities of a video, whether it be resoltution or perhaps even caption languages/audio tracks a company like netflix will store each independent quality as seperate objects then simply switch the source being displayed to the user.
Take for instance YouTube's resolution settings, when selecting a different resolution on the client side all that actually changes is the source location the video-player is pointing to; the same technique is used for differing languages in captions and audio tracks.

### #1 Slightly More ~Nuanced~ Approach
So far we've simply used the HTML5 video tag 