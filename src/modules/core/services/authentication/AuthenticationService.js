import Base from "../Base";

const resource = "/users";

export default {
  get(id) {
    return Base.get(`${resource}/${id}`);
  },

  login(credentials) {
    return Base.post(`${resource}/login`, credentials);
  },

  register(payload) {
    return Base.post(`${resource}/create`, payload);
  }
};
