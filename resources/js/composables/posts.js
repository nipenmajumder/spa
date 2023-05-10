import {ref} from 'vue'

export default function usePosts() {
    const posts = ref([])
    const getPosts = async (page = 1, perPage) => {
        try {
            const {data} = await axios.get('/api/posts', {params: {page, per_page: perPage}});
            posts.value = data;
        } catch (error) {
            console.error(error);
        }
    }


    return {posts, getPosts}
}
