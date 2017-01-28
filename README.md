# DREAM STREAM

Dream Stream is a script developed using Express and Node.js that checks the
DOTA 2 leaderboards and the Twitch API to determine the highest MMR players
currently streaming at any given moment.

From the command prompt run the server.js file, and then in your web browser go
to http://localhost:3000 to see the app in action. When running locally you will
need to obtain a client-ID from Twitch to use their API. Alternatively, you can
check out the Heroku deployment at dreamstream.herokuapp.com

# FREQUENTLY ASKED QUESTIONS

### Q:

I see a very high MMR streamer like Arteezy currently streaming on Twitch,
but when I look at Dream Stream the stream isn't listed. What gives?

### A:

If they have been playing exclusively, or nearly exclusively, on a smurf or alt
account then they have not met the necessary conditions to appear on the DOTA 2
leaderboards. See http://www.dota2.com/leaderboards for more details.

### Q:

What if I see someone that is on the leaderboard that is streaming who isn't
listed?

### A:

Sometimes people have different handles on Twitch and DOTA. Although
Dream Stream has a function that converts names so that they are equivalent,
there are undoubtedly missed exceptions. Please suggest a change to the
nameSwitch function in the collectdata.js file (starts at line 56), or
contact the author so this can be corrected.

### Q:

Why am I seeing duplicate entries of certain streamers?

### A:

This is a known bug, a fix will be forthcoming.

## LICENSE

Dream Stream is (c) 2016 Paul Jickling and made available under the MIT license
