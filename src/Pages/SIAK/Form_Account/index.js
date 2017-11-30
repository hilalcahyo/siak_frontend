import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import {
  actionUpdateResultPoisson,
  actionUpdateResultCumulativePoisson,
  actionUpdateInputForm1,
  actionUpdateInputForm2
} from '../../../Redux/Reducers/Pages/Reducer_Home'
import Request from 'request'



class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            local_state_nama_rekening: '',
            local_state_kode_rekening: ''
        }
        this.handleCatchInputNamaRekening = this.handleCatchInputNamaRekening.bind(this)
        this.handleCatchInputNomorRekening = this.handleCatchInputNomorRekening.bind(this)
        this.handleCatchSubmitButton = this.handleCatchSubmitButton.bind(this)
        this.handleHitAccount = this.handleHitAccount.bind(this)
    }
    handleHitAccount(){
        console.log('Hit backend')
        Request.post({url:'http://localhost:9000/account', 
        form: {
            nama_rekening: this.state.local_state_nama_rekening,
            kode_rekening: this.state.local_state_kode_rekening
            }}, function(err,httpResponse,body){
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
    handleCatchInputNamaRekening(event){
        let currentKeyboard = event.target.value
        this.setState({
            local_state_nama_rekening: currentKeyboard,
        })
    }
    handleCatchInputNomorRekening(event){
        let currentKeyboard = event.target.value
        this.setState({
            local_state_kode_rekening: currentKeyboard,
        })
    }
    handleCatchSubmitButton(){
        console.log((this.state.local_state_nama_rekening))
        console.log((this.state.local_state_kode_rekening))
        if( String(this.state.local_state_nama_rekening) !== '' && String(this.state.local_state_kode_rekening !== '')){
            this.handleHitAccount()
        } else {
            alert('Kedua form tidak boleh kosong')
        } 
    }

    render() {
        return (
            <div>
            <button onClick={this.props.changePageToMain}>Back To Main Page </button>
            <h1>Formulir Daftar Nomer Rekening</h1>
            <label>Nama Rekening</label>
            <br/>
            <input type='text' onChange={this.handleCatchInputNamaRekening} value={this.state.nama_rekening}/>        
            <br/>
            <label>Nomor Rekening</label>
            <br/>
            <input type='text' onChange={this.handleCatchInputNomorRekening} value={this.state.nomor_rekening}/>        
            <br/>
            <button onClick={this.handleCatchSubmitButton}>Submit </button>
            <br/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    result_poisson: state.Reducer_Home.result_poisson,
    result_cumulative_poisson: state.Reducer_Home.result_cumulative_poisson,
    inputForm1: state.Reducer_Home.inputForm1,
    inputForm2: state.Reducer_Home.inputForm2
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    actionUpdateResultPoisson,
    actionUpdateResultCumulativePoisson,
    actionUpdateInputForm1,
    actionUpdateInputForm2,
    changePageToMain: () => push('/')
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
  