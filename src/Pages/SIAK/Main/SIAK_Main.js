import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'


class Siak_Main extends React.Component {
    

  render() {
    return (
        <div>
            <button onClick={this.props.changePageToPageFormGeneralJournal}>Form Tambah Jurnal Umum</button>
            <br/>
            <button onClick={this.props.changePageToPageListGeneralJournal}>List Jurnal Umum</button>
            <br/>  
            <button onClick={this.props.changePagetToPageFormDetail}>Form Tambah Keterangan</button>
            <br/>
            <button onClick={this.props.changePageToPageListDetail}>List Keterangan</button>
            <br/>
            <button onClick={this.props.changePagetToPageFormAccount}>Form Tambah Nomer Rekening</button>
            <br/>            
            <button onClick={this.props.changePageToPageListAccount}>List Nomer rekening</button>
            <br/>                        
                                    
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
    changePageToPageListDetail : () => push('/list-detail')
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Siak_Main)
  