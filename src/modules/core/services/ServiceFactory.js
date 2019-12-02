import AuthenticationService from './authentication/AuthenticationService'
import UserService from './user/UserService'
import LessonService from './lesson/LessonService'

const repositories = {
  authenticationService: AuthenticationService,
  userService: UserService,
  lessonService: LessonService
}

export const ServiceFactory = {
  get: name => repositories[name]
}
