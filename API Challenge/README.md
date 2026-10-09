



what i did

i made one playwright test in javascript
it creates a board
then it creates a list on that board
then it creates a task on that list
a task here is a trello card
then it updates the task name and description
then it deletes the board
when the board is deleted the list and the task are deleted too

after each create and update the test reads the item again to check it was saved
each call is also checked for speed
if one call takes 8 seconds or more the test fails

i print a simple log for every step so i can see it in the terminal
the key and token stay in the env file and i do not commit that file


github actions runs this test on every push and every pull request
you can download the report from the actions run
the file name is trello-api-allure-report
on a push the report is also put on github pages in the folder trello-api-report

add these secrets on github before the run can pass
trello_api_key
trello_token



assumptions


cleanup means delete the board
performance means the time of one call not many users at once
if a step fails the test still deletes the board


--
i used ai to complete this task
i used to work with rest assured and postman and soapui
api testing with playwright is much easier
it will be easy to learn and grow with it in short time
--
resources i used

trello api introduction
https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/
i used this to see how a board a list and a card work and how to get a key

trello boards
https://developer.atlassian.com/cloud/trello/rest/api-group-boards/
i used this to create get and delete a board

trello lists
https://developer.atlassian.com/cloud/trello/rest/api-group-lists/
i used this to create and get a list

trello cards
https://developer.atlassian.com/cloud/trello/rest/api-group-cards/
i used this to create get and update a card

trello app key page
https://trello.com/app-key
i used this to get my api key and my token

playwright api testing
https://playwright.dev/docs/api-testing
i used this to call the api with playwright and not open a browser

playwright github actions
https://playwright.dev/docs/ci#github-actions
i used this for the workflow file

allure playwright
https://www.npmjs.com/package/allure-playwright
i used this to make the allure report





youtube videos i used to learn

playwright api testing
https://www.youtube.com/watch?v=NSDdeDYr3dY
this video shows how to call an api with playwright and check the status

playwright with github actions
https://www.youtube.com/watch?v=ZiQhPD3i3Ho
this video shows how to run playwright tests on github actions

playwright with allure report
https://www.youtube.com/watch?v=2LqFaYJlBVM
this video shows how to make an allure report from a playwright test
