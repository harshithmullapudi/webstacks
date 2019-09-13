export const actions = {
    ADD_TASK : 'add task',
    REMOVE_TASK : 'remove task',
    GET_RECORDS : 'get records',
    GET_USER  : 'get user',
    UPDATE_USER  : 'update user',
    UPDATE_USERDATA  : 'update user data',
    NULL_USERDATA  : 'null user data',
    SUBMIT_TEST  : 'update git',
    ADD_QUESTION: 'add question',
    GET_QUESTIONS: 'get questions',
    ADD_REPLY: 'add reply'
}


const actionCreators = {
    addTask : (task) => ({type: actions.ADD_TASK, task}),
    removeTask : (task) => ({type: actions.REMOVE_TASK, task}),
    getTasks : (records) => ({type: actions.GET_RECORDS, records}),
    addUser: (name, about, email,  phone, social, photo ) => ({
            type : actions.ADD_TASK,
            name,
            about,
            email,
            phone,
            social,
            photo
        }),
    updateUserData: (user) => ({
        type : actions.UPDATE_USERDATA,
        user
    }),
    updateUser: (details, photo) => {
        let name = details.name;
        let phone = details.phone;
        let social = details.social;
        let about = details.about;
        let email = details.email;
        let key = details.key;
        return{
            type : actions.UPDATE_USER,
            name,
            phone,
            social,
            about,
            photo,
            email,
            key
        }
    }
}

export default actionCreators;