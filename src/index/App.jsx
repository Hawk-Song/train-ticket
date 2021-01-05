import './App.css'
import Header from '../common/Header.jsx'
import DepartDate from './DepartDate.jsx'
import HighSpeed from './HighSpeed.jsx'
import Journey from './Journey.jsx'
import Submit from './Submit.jsx'
import {connect} from 'react-redux'

function App(props) {
    return (
        <div>
            <Header />
            <Journey />
            <HighSpeed />
            <Submit />
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {},
    function mapDispatchToProps(dispatch) {}
)(App);