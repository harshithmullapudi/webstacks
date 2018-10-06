import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {database, auth} from './firebase'
import thunkMiddleware from 'redux-thunk'
import  {notify} from 'react-notify-toast'
import * as firebase from "./firebase";

/**
 * ACTION TYPES
 */
const ADD_TASK = 'add task'
const REMOVE_TASK = 'remove task'
const GET_RECORDS = 'get records'
const GET_QUESTIONS = 'get questions'
const GET_USER  = 'get user'
const UPDATE_USER  = 'update user'
const UPDATE_USERDATA  = 'update user data'
const NULL_USERDATA  = 'null user data'
const SUBMIT_TEST  = 'update git'
const SET_QUESTON  = 'set question'


/**
 * ACTION CREATORS
 */
export const addTask = (task) => ({type: ADD_TASK, task})
export const removeTask = (task) => ({type: REMOVE_TASK, task})
export const getTasks = (records) => ({type: GET_RECORDS, records})
export const getQuestionsDispatch = (questions) => ({type: GET_QUESTIONS, questions})
export const setQuestion = (question) => ({type:SET_QUESTON, question})

/**
 * THUNKS
 */
export function getRecordsThunk() {

  return dispatch => {
    database.ref(`data`).orderByChild('points').on('value', snap => {
        let values = Object.keys(snap.val()).map(k => {
          if(snap.val()[k].verified) {
              let temp = snap.val()[k];
              temp["key"] = k;
             return  temp;
          }
        return null
        });
        values = values.filter(k => k);
        setTimeout(() => { dispatch(getTasks(values.sort((a, b) => b.points - a.points)))}, 1);

      })
  }
}

export function getQuestion(id , dispatch) {
    database.ref('questions/' + id).on('value', (snap) => {
        setTimeout(() => {  dispatch(setQuestion(snap.val()))}, 2)

    })
}

export function watchTaskChangedEvent(dispatch) {
    database.ref(`data`).on('child_changed', (snap) => {
        let user = store.getState().Reducer.user;
        if(user && (user.email === snap.val().email))
        {
           let details = snap.val();
           details['key'] = snap.key;
            setTimeout(() => {  dispatch(updateUserData(details)); }, 1);

        }
        else
        {
            setTimeout(() => {  dispatch(updateUserData(user)); }, 1);

        }
    });


}

export function addComentDB(question, comment) {
    let id = Math.floor(Math.random()*90000) + 10000;
    return database.ref('questions/'  + question.id + '/comments/' + id).set({
        is : id,
        created : (new Date()).getTime(),
        comment : comment,
        user : store.getState().Reducer.user.email,
        name : store.getState().Reducer.user.name.first +  store.getState().Reducer.user.name.last
    })
}

export function getQuestions() {
    return dispatch => {
        database.ref(`questions`).on('value', snap => {
            if(snap.val()) {
                let values = Object.keys(snap.val()).map(k => {
                    return snap.val()[k];
                });
                setTimeout(() => {
                    dispatch(getQuestionsDispatch(values))
                }, 1);
            }
        })
    }
}

function updateUserData(user)
{
    return{
        type : UPDATE_USERDATA,
        user

    }
}

export function addQuestionDB(title, description)
{
    let id = Math.floor(Math.random()*90000) + 10000;
   return database.ref("questions/"+ id ).set({
       id : id,
        title : title,
        description : description,
        by : store.getState().Reducer.user.email,
        name : store.getState().Reducer.user.name.first + store.getState().Reducer.user.name.last ,
        comments : [],
       added : (new Date()).getTime()
    })
}

export function login(email, password) {
    auth.signInWithEmailAndPassword(email, password).then(result => {
        notify.show("Successfully Logged In ", "success")
    }).catch(function(error) {
     notify.show(error.message, "error")
    })

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

function addUsers(obj) {
  database.ref("data").push(obj);

}

function upUser(obj, key) {

 database.ref('data/' + key).update(obj).then(result => {
     notify.show("Successfully updated your profile", "success");
 })

}

export function addUser(name, about, email,  phone, social, photo ){
  return {
    type : ADD_TASK,
      name,
      about,
      email,
      phone,
      social,
      photo
  }

}
export function updateUser(details, photo) {
    let name = details.name;
    let phone = details.phone;
    let social = details.social;
    let about = details.about;
    let email = details.email;
    let key = details.key;
    return{
        type : UPDATE_USER,
        name,
        phone,
        social,
        about,
        photo,
        email,
        key

    }
}

export function checkUser()
{
    return dispatch => {

            firebase.auth.onAuthStateChanged(authUser => {
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
    case GET_QUESTIONS:
          return { 'questions' : action.questions, "user" : state.user, "records" : state.records , "question" : state.question};
    case GET_RECORDS:
      return { 'records' : action.records, "user" : state.user,  "questions" : state.questions , "question" : state.question};
      case SET_QUESTON:
          return { 'records' : state.records, "user" : state.user,  "questions" : state.questions , "question" : action.question};
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
    case ADD_TASK:
      addUsers({"name" : action.name, "about" : action.about, "email" : action.email, "phone" : action.phone, "social" : action.social, "points": 0, "photo": action.photo, "verified" : false});
      return state;
    default:
      return state
  }
}

export const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
    combineReducers({
        Reducer,
        router: routerReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(middleware,thunkMiddleware)
)
export default store;
