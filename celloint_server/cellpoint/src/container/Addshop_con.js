import { connect } from 'react-redux'
import { Action_addshop } from '../actions/Action_addshop'
import Addshop from '../Addshop'
// import { useDispatch } from 'react-redux'

const mapStateToProps = state => ({
    data: state
})
const mapDispatchToProps = dispatch=> ({
        addshopHandler: data => dispatch(Action_addshop(data))

})


export default connect(mapStateToProps,mapDispatchToProps)(Addshop);
