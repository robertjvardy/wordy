// TODO investigate how this is received by the UI in terms of rendering validation errors
export const userAlreadyExists = new Response("User Already Exists", {
  status: 409,
});

export const resourceNotFound = new Response("Resource Not Found", {
  status: 404,
});

export const authenticationError = new Response("Invalid Credentials", {
  status: 403,
});
