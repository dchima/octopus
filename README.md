# octopus


## Remarks
This was a very nice little project to work on. It's bbeen a while since i integrated with the Paystack API, so working with it in a small capacity was fun. i also hadn't written graphql in a minute. forgot how sweet it was to simply write shemas that fit the data qury I need on the fly.

### Architecture Decisions
I decided to assume the verification occoured during every addition to the database. This way, a positive verification of one's account number and bank code from the paystack api guaranteed you a space in the database. However, this did not guaranty a verified status.

The verification status of the user in our database depended on if the user passed the Levenshtein distance of 2. The account name from paystack is always saved during the add account mutation. This way, When we perform the Query on an account that is in our database, but did not pass the Levenshtein Distance check, we do not need to perofrm another call to the paystack API.

All accounts that pass the Levenshtein distance chech will have the name they inputed returned back to the client.





## Levenshtein distance
This was truly the first time I ever worked with this algorithm. The idea that one can calulate how many edits it takes to swap string A until it fits with another string B was novel. There are a few scenarios I plan to use this In my professsional work (e.g knowing how closely a transaction narration may fit with another in a given set to better categorize them). 

The task specified I point out the key differnces between the basic Levenshtein distance, and the Damerau-Levenshtein distance. I haven't been able to implement it, so it's just the theory I have. Where the former takes into account inserts, deletes, and ubstitutions on the edit, the latter also takes into acount transposition. Computation, I assume, would suffer with an added layer of complexity, even though the distance mah turn out more accurate.