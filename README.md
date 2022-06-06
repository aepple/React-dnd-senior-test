## Banquet table organizer app - aepple: To Albin, please check. This is my work. I'm Nakamoto.


https://user-images.githubusercontent.com/106753424/172024707-876b2c5b-bde2-4f1a-8a59-95f3176ef9a6.mp4

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


