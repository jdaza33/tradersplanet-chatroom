import AuthenticationService from "./authentication/AuthenticationService";

const repositories = {
  UserService: AuthenticationService
};

export const ServiceFactory = {
  get: name => repositories[name]
};
