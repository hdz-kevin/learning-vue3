import { ref } from "vue"
import axios from "axios";


export function useFetch(url, options = { onError: null }) {
    const data = ref(null);
    const error = ref(null);
    const isLoading = ref(true);

    axios.get(url)
         .then(res => data.value = res.data)
         .catch(err => {
            error.value = err
            if (options.onError) {
                options.onError(err)
            }
         })
         .finally(() => isLoading.value = false);

    return {
        data,
        error,
        isLoading,
    };
}
