import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'


class Siak_Main extends React.Component {
    

  render() {
    return (
        <div>
            <button onClick={this.props.changePageToPageFormGeneralJournal}>Form Add General Journal</button>
            <br/>
            <button onClick={this.props.changePageToPageListGeneralJournal}>List General Journal</button>
            <br/>  
            <button onClick={this.props.changePagetToPageFormDetail}>Form Add Keterangan</button>
            <br/>
            <button onClick={this.props.changePageToPageListDetail}>List Details</button>
            <br/>
            <button onClick={this.props.changePagetToPageFormAccount}>Form Add Account Number</button>
            <br/>            
            <button onClick={this.props.changePageToPageListAccount}>List Account Number</button>
            <br/>                        
            <button onClick={this.props.changePageToPageListBigBook}>Big Book</button>
            <br/>
            <button onClick={this.props.changePageToPageListNeracaSaldo}>Neraca Saldo</button>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <h3>Team Creator SIAK Web</h3>
            <p>53416303 hilal cahyo</p><br/>                        
            <p>54416987 muhammad lutfhi ardi</p><br/>                        
            <p>57416477 ullya nada</p><br/>                        
            <p>54416188 muhammad uwais t m</p><br/>                        

                                  
        </div>
    )
  }
}


const mapStateToProps = state => ({

})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    changePageToPageFormGeneralJournal : () => push('/form-general-journal'),
    changePageToPageListGeneralJournal : () => push('/list-general-journal'),
    changePagetToPageFormAccount : () => push('/form-account'),
    changePagetToPageFormDetail : () => push('/form-detail'),
    changePageToPageListAccount : () => push('/list-account'),
    changePageToPageListDetail : () => push('/list-detail'),
    changePageToPageListBigBook : () => push('/list-big-book'),
    changePageToPageListNeracaSaldo : () => push('/list-neraca-saldo')
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Siak_Main)
  