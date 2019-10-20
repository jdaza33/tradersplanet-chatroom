import Base from "../Base";

const resource = "/posts";

export default {
    get() {
        return Base.get(`${resource}`);
    },

    getPost(postId) {
        return Base.get(`${resource}/${postId}`);
    },

    createPost(payload) {
        return Base.post(`${resource}`, payload);
    }
};
