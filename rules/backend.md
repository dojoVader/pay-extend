## NestJS Backend

- In the NestJS Backend, create a Dashboard Controller which should be added to the Dashboard module
- Create a Controller called verify in the Dashboard module that will handle the verification of the user session. This controller should have a GET endpoint that checks if the user is authenticated and returns a response containing the user information
- Use the AuthGuard from the auth module to protect the verify endpoint, ensuring that only authenticated users can access it. If the user is authenticated, return a response with the user's information; if not, return an appropriate error message indicating that authentication is required.