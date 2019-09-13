import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import {database, auth} from '../firebase'
import thunkMiddleware from 'redux-thunk'
import  {notify} from 'react-notify-toast'
import actionCreators ,{actions} from './Actions';
import { stat } from 'fs'

const { addTask,
        removeTask,
        updateUserData,
        getTasks,
        getQuestionsDispatch,
        setQuestion,
        getChatsDispatch} = actionCreators;

const {
    ADD_TASK,
    REMOVE_TASK,
    ADD_QUESTION,
    GET_RECORDS,
    GET_QUESTIONS,
    GET_USER,
    UPDATE_USER, 
    UPDATE_USERDATA,
    NULL_USERDATA,
    SUBMIT_TEST, 
    ADD_REPLY,
    SET_QUESTON, 
    GET_CHAT
} = actions;

// Thunk to fetch user from DB

export const checkUser = () => dispatch => {
    auth.onAuthStateChanged(authUser => {
        if (authUser) {
            database.ref('data').orderByChild('email').equalTo(authUser.email).once('value', users => {
            let user = Object.keys(users.val()).map(k => {
                let temp = users.val()[k];
                temp['key'] = k;
                return temp;
            })[0]
            dispatch({
                type: GET_USER,
                user
            })
        })
        }
        else {
            dispatch({
                type : NULL_USERDATA
            })
        }
    });
}

// Thunk to get  User data for leaderboard 

export const getRecordsThunk = () => async (dispatch) => {
    let snapshot = await database.ref('data').orderByChild('points').once('value');
    let values = Object.keys(snapshot.val()).map(key => {
        if(snapshot.val()[key]) {
            let temp = snapshot.val()[key];
            temp["key"] = key;
            return temp;
        }
        return null;
    });
    dispatch(getTasks(values.sort((a,b) => b.points - a.points)));
}

// Forum part

export const addQuestion = (data) => async (dispatch) => {
    let newQuestion = await database.ref(`/questions/${data.cluster}/${data.id}`).set(data);
    console.log(newQuestion);
    dispatch({
        type: ADD_QUESTION,
        question: data
    });
}

export const getQuestions = () => async (dispatch) => {
    let snap = await database.ref(`questions`).once('value');
    let data = snap.val();
    if(data === null)
        data = [];
    dispatch({
        type: GET_QUESTIONS,
        questions: data
    });
}

export const addReply = (data) => async (dispatch) => {

    let ref = await database.ref(`/questions/${data.channel}/${data.key}`);
    let res = await ref.child("replies").push({
        reply: data.reply,
        author: data.author,
        timestamp: new Date().toISOString()
    });
    console.log(res.key);
    let response = {
        key: res.key,
        reply: data.reply,
        author: data.author,
        timestamp: new Date(),
    }
    dispatch({
        type: ADD_REPLY,
        reply: {
            response,
            channel: data.channel,
            key: data.key
        }
    });
}
// Forum part ends here



// User authentication 

export function login(email, password) {
    auth.signInWithEmailAndPassword(email, password).then(result => {
        notify.show("Successfully Logged In ", "success")
    }).catch(function(error) {
     notify.show(error.message, "error")
    })
}

export const signup = (data) => async (dispatch) => {
    try {
        console.log(data)
        await auth.createUserWithEmailAndPassword(data.email, data.password);
        await database.ref("data").push(data);
        notify.show("Account created successfully!", "success");
    } catch(err) {
        console.log(err);
    }
    dispatch({
        type: 'TEST'
    });
}


export function signOut() {
    auth.signOut().then(function() {
        notify.show("Successfully Logged Out", "success");
    }).catch(function(error) {
        notify.show(error.message, "error")
    });
}

export function submitTestUrl(link) {
    return dispatch => {
        dispatch(
           {
                type: SUBMIT_TEST,
                link
            }
        )
    }
}


function upUser(obj, key) {

 database.ref('data/' + key).update(obj).then(result => {
     notify.show("Successfully updated your profile", "success");
 })

}

function submit_response(user){
    database.ref('data/' + user.key).update(user).then(result => {
        notify.show("Successfully Submitted", 'success');
    })
}

/**
 * REDUCER
 */
function Reducer (state = { records : [], questions : [], user : null, question : null }, action) {
  switch (action.type) {
    case GET_USER:
          return { 'user' : action.user,"records" : state.records, "questions" : state.questions, "question" : state.question};
    case GET_RECORDS:
      return { 'records' : action.records, "user" : state.user,  "questions" : state.questions , "question" : state.question};
    case UPDATE_USER:
        upUser({'name': action.name, 'about' : action.about, 'photo' : action.photo, 'social' : action.social, 'phone' : action.phone}, action.key);
        return state;
    case UPDATE_USERDATA:
         return {'records' : state.records, 'user' : action.user,  "questions" : state.questions , "question" : state.question};
     case NULL_USERDATA:
         return {'records' : state.records, 'user' : null,  "questions" : state.questions , "question" : state.question};
     case SUBMIT_TEST:
         if(!state.user.answer)
         {
             state.user["answer"] = [];
         }
         state.user["answer"].push({
             'task' : 2,
             'link' : action.link
         })
         submit_response(state.user);
         return state;
    case ADD_QUESTION:
        return {...state,
                "questions": {
                    ...state.questions,
                    [action.question.cluster]: {
                        ...state.questions[action.question.cluster],
                        [action.question.id]: action.question
                    }
                }
            }
    case GET_QUESTIONS: 
         return {...state, "questions": action.questions }
    case ADD_REPLY: 
            console.log("inside reducer", action);
         return {...state, "questions": {
             ...state.questions,
             [action.reply.channel]: {
                 ...state.questions[action.reply.channel],
                 [action.reply.key]: {
                     ...state.questions[action.reply.channel][action.reply.key],
                     replies: {
                         ...state.questions[action.reply.channel][action.reply.key].replies,
                         [action.reply.response.key]: action.reply.response
                     }
                 }
             }
         }}
    default:
      return state
  }
}

export const history = createHistory()
const store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
)
export default store;
