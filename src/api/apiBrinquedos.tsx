import axios from 'axios';
import { environment } from '../environment';

const apiBrinquedos = axios.create(
    {
        baseURL: environment.baseurl,
    }
);

export default apiBrinquedos