import axios from 'axios';

export function getFollowUps() {
    return axios
        .get('dashboard/followups')
        .then((response) => response.data);
}