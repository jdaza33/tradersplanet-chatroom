import Base from "../Base";

const resource = "/lessons";

export default {
  create(payload) {
    return Base.post(`${resource}/create`, payload);
  },
  get(id) {
    return Base.get(`${resource}/${id}`);
  },
  delete(id) {
    return Base.delete(`${resource}/${id}`);
  },
  edit(id, changes) {
    return Base.put(`${resource}/${id}`, changes);
  },
  list(filters = {}) {
    return Base.post(`${resource}/list`, filters);
  }
};
