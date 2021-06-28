import React, { useState } from 'react';
import { connect } from 'react-redux'

const menu = {"menu_side": []};

function MasterPage(props) {
    return (
        <div>
            master
        </div>
    )
}

const mapStateToProps = (state) => {
    //const { modal } = state;
    //return { modal };  
  }
  
  const mapDispatchToProps = {
    //modalOpen: modalActions.open
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MasterPage)

