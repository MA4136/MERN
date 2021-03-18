import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alert = () => {
    return (
        <div>

        </div>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
 return {alerts: state.alert}
}

export default connect(mapStateToProps)(Alert)