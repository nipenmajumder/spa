<template>
    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
            <div class="min-w-full align-middle flex justify-between mb-2">
                <div class="flex justify-end mb-4">
                    <span class="mr-2">Per Page:</span>
                    <select
                        class="form-select w-20"
                        v-model.number="perPage"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <router-link :to="{ name: 'posts.create'}"
                             class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto">
                    Create Post
                </router-link>
            </div>
            <table class="min-w-full divide-y divide-gray-200 border">
                <thead>
                <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span
                            class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-left">
                        <span
                            class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span>
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                <tr v-for="post in posts.data">
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                        {{ post.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                        {{ post.title }}
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                        {{ post.content }}
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                        {{ post.created_at }}
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="mt-4 divide-y divide-gray-200">
                <TailwindPagination
                    :data="posts" :limit="10"
                    @pagination-change-page="getPaginatedPosts($event, perPage)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import usePosts from "../../composables/posts";
import {TailwindPagination} from 'laravel-vue-pagination';
const perPage = ref(10);

const {posts, getPosts} = usePosts()
onMounted(() => {
    getPosts(1, perPage.value)
})
watch(perPage, (newPerPage) => {
    getPosts(1, newPerPage);
});

function getPaginatedPosts(page, perPage) {
    console.log(page, perPage)
    getPosts(page,perPage)

}

</script>


<style scoped>

</style>
