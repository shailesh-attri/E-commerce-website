import axios from "axios";

const params = {
    headers: {
        Authorization: "bearer " + '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',
    },
};

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(
            'http://localhost:4242' + url,
            params
        );
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const makePaymentRequest = axios.create({
    baseURL: 'http://localhost:4242',
    headers: {
        Authorization: "bearer " + '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',
        Authorization: "bearer " + '',
    },
});