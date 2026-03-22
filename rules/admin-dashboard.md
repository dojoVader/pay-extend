## Admin Dashboard for the folder `apps/spa-next

- In the login.vue file add a link to the bottom to register a new account. This should link to a new page called register.vue
- In the register.vue file create a form that allows users to register for a new account using the username and password fields. The form should have a submit button that sends the data to the backend to create a new user account.
- Use the backend endpoint from apps/backend/modules/auth/auth.controller.ts to handle the registration logic. This endpoint should create a new user in the database and return a success message if the registration is successful.
- After successful registration, redirect the user to the login page where they can log in with their new account credentials.


## Dashboard and HttpOnly Cookies

- in the dashboard vue file, make an endpoint call to the backend to verify the user session using the verify endpoint created in the NestJS Backend. This should be done when the dashboard component is mounted.
- If the user is authenticated, display the user's information on the dashboard page in the Topbar component. This can include the username and any other relevant information retrieved from the backend.
- If the user is not authenticated, redirect them to the login page to ens`1ure that only authenticated