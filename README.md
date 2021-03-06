# DREAM STREAM

Dream Stream is a script developed using Express and Node.js that checks the
DOTA 2 leaderboards and the Twitch API to determine the highest ranked players
currently streaming at any given moment.

After installing the dependencies, from the command prompt run the server.js
file, and then in your web browser go to http://localhost:3000 to see the app in
action. When running locally you will need to obtain a client-ID from Twitch to
use their API. Alternatively, you can check out the Heroku deployment at
https://dreamstream.herokuapp.com/

# FREQUENTLY ASKED QUESTIONS

### Q:

I see a very high rank streamer currently streaming on Twitch,
but when I look at Dream Stream the stream isn't listed. What gives?

### A:

If they have been playing exclusively, or nearly exclusively, on a smurf or alt
account then they have not met the necessary conditions to appear on the DOTA 2
leaderboards. See http://www.dota2.com/leaderboards for more details.

### Q:

I see the rank for a particular streamer is wrong. Why is that happening?

### A:

Sometimes popular or notable players have copycats. In those instances Dream
Stream defaults to the highest rank value. The assumption that is made here is that the more well known player is the one with the highest rank, and that it is also most likely the individual that is streaming. However there are edge cases where these assumptions could be wrong. The decision made was that it is better to be right in 99% of instances as opposed to generally wrong because it couldn't handle the 1% of edge cases.

### Q:

What if I see someone that is on the leaderboard that is streaming who isn't
listed?

### A:

Sometimes people have different handles on Twitch and DOTA. Although
Dream Stream has a function that converts names so that they are equivalent,
there are undoubtedly missed exceptions, especially with the increased size of
the leaderboards following the change to a seasonal rank system. Please suggest
a change to the nameSwitch function in the getstreamers.js file (it is the
function at the end of the script), or contact the author so this can be corrected.

If you make a pull request for updating the nameSwitch function please keep the request in alphabetical order in order to facilitate ease of maintenance.

## LICENSE

Dream Stream is (c) 2016 Paul Jickling and made available under the MIT license
