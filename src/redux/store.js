import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import {database, auth} from '../firebase'
import thunkMiddleware from 'redux-thunk'
import  {notify} from 'react-notify-toast'
import * as firebase from "../firebase";
import actionCreators ,{actions} from './Actions';

const { addTask,
        removeTask,
        getTasks,
        getQuestionsDispatch,
        setQuestion,
        getChatsDispatch} = actionCreators;

const {
    ADD_TASK,
    REMOVE_TASK,
    GET_RECORDS,
    GET_QUESTIONS,
    GET_USER,
    UPDATE_USER, 
    UPDATE_USERDATA,
    NULL_USERDATA,
    SUBMIT_TEST, 
    SET_QUESTON, 
    GET_CHAT
} = actions;

export function getRecordsThunk() {

  return dispatch => {
    database.ref(`data`).orderByChild('points').on('value', snap => {
        let values = Object.keys(snap.val()).map(k => {
          if(snap.val()[k]) {
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
//A function to get the data from the DB
export function getChats() {

  return dispatch => {
    database.ref('/chat').limitToLast(12).on('value',snap => {

        if(snap.val()) {
          let values = Object.keys(snap.val()).map(k => {

              return snap.val()[k];
          });
          setTimeout(() => {
            dispatch(getChatsDispatch(values.sort((a,b) => a.added - b.added)))
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
// Added a function to add the chat in db
export function addChatDB(content,imgUrl)
{
    let id = Math.floor(Math.random()*90000) + 10000;
   return database.ref("chat/"+ id ).set({
       id : id,
        description : content,
        by : store.getState().Reducer.user.email,
        imgUrl: imgUrl,
        name : store.getState().Reducer.user.name.first +" "+ store.getState().Reducer.user.name.last ,
       added : (new Date()).getTime(),
       pic : store.getState().Reducer.user.photo.type,
       picid : store.getState().Reducer.user.photo.number
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
    case GET_CHAT:
      return { 'records' : state.records, "user" : state.user, "chats" : action.chats};
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
const store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
)
export default store;
