# Bevy Software Engineering Coding Assessment:

## Banquet table organizer app

We're creating a fictional app which can be used to organize the guests across a number of banquet tables. We could assume this app will be used by weddings or formal gatherings where seating assignments are required.

The app in this repo is a mostly complete implementation, but it is missing some key features which we'd like you to finish. There is a lot of comments in the code to help get your bearings and a few "TODOs" to identify which pieces are still missing.

### Mockups

The styles of your app should match the styles provided in this mockup:

![mockup](https://user-images.githubusercontent.com/6416083/159060470-2b4f3cd5-92ed-4e08-a1f6-ac087a844ba7.png)

https://user-images.githubusercontent.com/6416083/159061003-4694af03-3ba3-45e2-a53f-e108d8c4685e.mov

### Functionality

The app is already set up to pull the table and guest data from `src/data.json`. Please familiarize yourself with the existing code and the data provided to understand the requirements.

1. The user **can** drag a guest within their table to change the order.
2. The guest's order changes when the dragged guest **hovers** over any other guest on the table.
3. The user **can** drag a guest to a new table.
4. When the dragged guest hovers over the new table it will be added at the end of that table.
5. Without releasing the mouse, the user can continue to drag the guest allowing the user to change their position on the table.
6. The user **cannot** drag a guest into a different table which has already reached maximum capacity.
7. The user **cannot** drag a guest into a table which has a person they aren't allowed to pair with, or who isn't allowed to pair with them.
8. The app uses the `doNotPair` array, which contains the IDs of users they can't be paired with.
9. In both of the above cases, an overlay will show up on the table with a message. For a full table the message is "{Table Name} is full", and for preventing pairs "{Dragged Guest} can't sit next to: {List Of Guests They can't sit next to}".

## Assignment details

**Rules**: We want you to give us the best possible sample of work, so you are allowed to use any npm libraries at your disposal. No need to over think it and please don’t submit plagiarised work. For example: asking someone else to do the work for you or forking someone else's repo and turning it in as your own work.

**Timeline**: We understand that many people have commitments outside of work that can make it challenging to find the time to do an assignment. This being said, technical work samples are one of the most predictive ways for an employer to assess qualified candidates, even if it slows down the interview process.

We anticipate that the takehome will take about 2 - 4 hours to complete, assuming a block of uninterrupted, continuous, focus time. Additionally, we ask that you return your completed takehome solution to us in at least a week. However, the sooner you turn it in the sooner we can get to the next interview round and a potential offer of employment.

If you need to renegotiate that timeline that's ok! Just let us know and we will work with you. However, if we don’t hear anything from you within two weeks we will assume you found another role and close your application.

**Questions**: We strongly encourage communication through this process, so please ask us any questions you have in the issues tab of this repo and tag @jamwise.

**Submission**: Please submit the takehome as a Pull Request in this repo.

**Grading and Evaluation**: Generally one - three Bevy engineers will review your submission just like they would any Pull/Merge Request review. We will evaluate if each of the objectives has been implemented, how efficiently it was implemented (algorithmically and software patterns/design), how you can be sure that it works (like tests), how you handled edge cases, and how well you followed best practices for the technologies you used. Your submission will be graded holistically, so don’t worry too much if you don’t feel good about a specific part of your solution. In the next round we will certainly discuss the pros and cons of your solution and your reasoning behind your technical decisions.

## Objectives

### 1. Add css styles in the 3 css modules containing TODOs to match the mockups above.
- [ ] Add styles for Guest
- [ ] Add styles for Table
- [ ] Add styles for Tables
### 2. Implement the `MOVE_GUEST` reducer in `src/state/index.js` (This can be confirmed by running existing tests using `npm test`).
- [ ] Implement moving a guest from one position to another on the same table
- [ ] Implement moving a guest to a new table without hovering over another guest
- [ ] Implement moving a guest to a new table when hovering over another guest
- [ ] Implement an error when moving a guest to a table that is full
- [ ] Implement an error when moving a guest to a table with guests they shouldn't be paired with
### 3. Add new tests
- [ ] Add new tests to cover the logic for table size and preventing pairing of guests, as well as anything else you'd like to include.
### 4. Open a Pull Request
- [ ] Open a Pull Request with a detailed description of your changes.

## Setup instructions

- Clone this repo to your machine
- Make sure you have node installed. [Nvm](https://github.com/nvm-sh/nvm) is a good tool if you don't already have it set up.
- Install dependencies with `npm ci`
- Run the application using `npm start`
- Run the tests using `npm test`
