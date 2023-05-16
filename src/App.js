// import React from "react";
// import "./App.scss";
// import "./resetStyle.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { store, socket } from "./reducers";
// import { createBrowserHistory } from "history";
// import { Provider, connect } from "react-redux";
// import { Router, Route, Switch } from "react-router-dom";
// import { CLogin } from "./pages/loginPage";
// import { CRegistration } from "./pages/regPage";
// import { Header } from "./components/header";
// import { CProfilePage } from "./pages/profilePage";
// import { CNewChatPage } from "./pages/newChat/NewChatPage";
// import { CChangePass } from "./pages/profilePage/changePassword";
// import { ChangesDone } from "./pages/profilePage/changeDonePage";
// import { ChangesDoneForChats } from "./pages/ChangeDoneForChat";
// import { AboutUs } from "./pages/aboutUs";
// import { Redirect } from "react-router-dom";
// import { CChatMsgs } from "./pages/oneChatPage";
// import { CChatsAside } from "./pages/chatsAside";
// import { CChatEditing } from "./pages/chatEditing/ChatEditing";

// export const history = createBrowserHistory();

// const AuthSwitch = ({ token }) => {
//     if (token) {
//         console.log("подключение сокета");
//         socket.emit("jwt", token);
//     }

//     return (
//         <>
//             <Switch>
//                 <Route path="/login" component={() => <></>} />
//                 <Route path="/registration" component={() => <></>} />
//                 <Header />
//                 <Redirect to={token === undefined ? "/login" : "/main"} />
//             </Switch>

//             <div className="mainContainer">
//                 <Route path="/main" component={CChatsAside} />
//                 <Route path="/main/:_id" component={CChatMsgs} />
//             </div>

//             <Switch>
//                 <Route path="/login" component={CLogin} />
//                 <Route path="/registration" component={CRegistration} />
//                 <Route path="/newchat" component={CNewChatPage} />
//                 <Route path="/changepas" component={CChangePass} />
//                 <Route path="/changesdone" component={ChangesDone} />
//                 <Route
//                     path="/changesdonechats"
//                     component={ChangesDoneForChats}
//                 />
//                 <Route path="/chatediting/:_id" component={CChatEditing} />
//                 <Route path="/aboutus" component={AboutUs} />
//                 <Route path="/profile" component={CProfilePage} />
//             </Switch>
//         </>
//     );
// };

// const CAuthSwitch = connect((state) => ({ token: state.auth?.token }))(
//     AuthSwitch
// );

// function App() {
//     return (
//         <>
//             <Router history={history}>
//                 <Provider store={store}>
//                     <CAuthSwitch />
//                 </Provider>
//             </Router>
//         </>
//     );
// }

// export default App;

import React, { useEffect } from "react";
import "./App.scss";
import "./resetStyle.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { store, socket } from "./reducers";
import { createBrowserHistory } from "history";
import { Provider, connect } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { CLogin } from "./pages/loginPage";
import { CRegistration } from "./pages/regPage";
import { Header } from "./components/header";
import { CProfilePage } from "./pages/profilePage";
import { CNewChatPage } from "./pages/newChat/NewChatPage";
import { CChangePass } from "./pages/profilePage/changePassword";
import { ChangesDone } from "./pages/profilePage/changeDonePage";
import { ChangesDoneForChats } from "./pages/ChangeDoneForChat";
import { AboutUs } from "./pages/aboutUs";
import { CChatMsgs } from "./pages/oneChatPage";
import { CChatsAside } from "./pages/chatsAside";
import { CChatEditing } from "./pages/chatEditing/ChatEditing";

export const history = createBrowserHistory();

const AuthSwitch = ({ token }) => {
  useEffect(() => {
    if (token) {
      console.log("подключение сокета");
      socket.emit("jwt", token);
    }
  }, [token]);

  if (!token) {
    return (
      <Switch>
        <Route path="/login" component={CLogin} />
        <Route path="/registration" component={CRegistration} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <>
      <Header />

      <div className="mainContainer">
               <Route path="/main" component={CChatsAside} />
                <Route path="/main/:_id" component={CChatMsgs} />
                <Redirect to="/main" />
            </div>

      {/* <div className="mainContainer"> */}
        <Switch>
          <Route path="/newchat" component={CNewChatPage} />
          <Route path="/changepas" component={CChangePass} />
          <Route path="/changesdone" component={ChangesDone} />
          <Route path="/changesdonechats" component={ChangesDoneForChats} />
          <Route path="/chatediting/:_id" component={CChatEditing} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/profile" component={CProfilePage} />
          
        </Switch>
      {/* </div> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth?.token,
});

const ConnectedAuthSwitch = connect(mapStateToProps)(AuthSwitch);

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <ConnectedAuthSwitch />
      </Provider>
    </Router>
  );
}

export default App;
