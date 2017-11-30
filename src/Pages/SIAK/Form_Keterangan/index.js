import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
// import {
//   actionUpdateResultPoisson,
//   actionUpdateResultCumulativePoisson,
//   actionUpdateInputForm1,
//   actionUpdateInputForm2
// } from '../../../Redux/Reducers/Pages/Reducer_Home'
import Request from 'request'



class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            local_state_deskripsi_keterangan : ''
        }
        this.handleCatchInputDeskripsiKeterangan = this.handleCatchInputDeskripsiKeterangan.bind(this)
        this.handleCatchSubmitButton = this.handleCatchSubmitButton.bind(this)
        this.handleHitAccount = this.handleHitAccount.bind(this)
    }
    handleHitAccount(){
        console.log('Hit backend')
        Request.post({url:'http://localhost:9000/detail', 
        form: {
            deskripsi_keterangan: this.state.local_state_deskripsi_keterangan
            }}, function(err, httpResponse, body){
            if(err){
                console.log(err)
            } else {
                if(httpResponse.statusCode === 500){
                    alert('Duplikat Pada Form')
                } else{
                    alert('Berhasil')
                }
            }    
        })
    }
    handleCatchInputDeskripsiKeterangan(event){
        let currentKeyboard = event.target.value
        this.setState({
            local_state_deskripsi_keterangan: currentKeyboard,
        })
    }
    handleCatchSubmitButton(){
        if( String(this.state.local_state_deskripsi_keterangan) !== ''){
            this.handleHitAccount()
        } else {
            alert('Kedua form tidak boleh kosong')
        } 
    }

    render() {
        return (
            <div>
            <button onClick={this.props.changePageToMain}>Back To Main Page </button>
            <h1>Formulir Daftar Keterangan</h1>
            <label>Deskripsi Keterangan</label>
            <br/>
            <input type='text' onChange={this.handleCatchInputDeskripsiKeterangan} value={this.state.local_state_deskripsi_keterangan}/>        
            <br/>
            <button onClick={this.handleCatchSubmitButton}>Submit </button>
            <br/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    changePageToMain: () => push('/')
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
  