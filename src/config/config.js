const dev = {
    API_URL: "https://hiring-task-api.herokuapp.com/v1"
};

const prod = {
    API_URL: "prod-url"
};



const config = process.env.NODE_ENV === 'production'
    ? prod
    : dev;

export default {
    ...config
};
