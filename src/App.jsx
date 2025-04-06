import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
// import { Layout } from './Components/layout';
import { Layout } from './Components/Layout';
import { Home } from './Pages/Home';

import { SignIn } from './Pages/SignIn';
import { SignUp } from './Pages/SignUp';
import { Dashboard } from './Pages/Dashboard';
import { Article } from './Pages/Article';
import { Setting } from './Pages/Setting';
import './index.css';
import { Friends } from './Pages/Friends';
import { History } from './Pages/History';
import { Groups } from './Pages/Groups';
import { Profile } from './Pages/Profile';
import { Insights } from './Pages/Insights';
import { Expenses } from './Pages/Expenses';

function App() {
    return (
        <HashRouter>
            <Routes>
                {/* Wrap pages inside Layout */}
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/articles" element={<Layout><Article /></Layout>} />
                <Route path="/friends" element={<Layout><Friends /></Layout>} />
                <Route path="/setting" element={<Layout><Setting /></Layout>} />
                <Route path="/history" element={<Layout><History /></Layout>} />
                <Route path="/groups" element={<Layout><Groups /></Layout>} />
                <Route path="/profile" element={<Layout><Profile/></Layout>} />
                <Route path="/expenses" element={<Layout><Expenses/></Layout>} />
                <Route path="/insights" element={<Layout><Insights/></Layout>} />
            </Routes>
        </HashRouter>
    );
}

export default App;



