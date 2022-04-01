import { connect } from 'react-redux'
import App from '../App'
import Desing from '../Desing'
import { Action_app } from '../actions/Action_addshop'
import { Action_addshop } from '../actions/Action_addshop'
// import { useDispatch } from 'react-redux'

const mapStateToProps = state => ({
    data: state
})
const mapDispatchToProps = dispatch=> ({
        againaddshopHandler: (data) => dispatch(Action_addshop(data))

})


export default connect(mapStateToProps,mapDispatchToProps)(Desing);