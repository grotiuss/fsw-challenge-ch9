import React, {Component} from 'react'
import { Container, Table } from 'reactstrap';
import firebase from '../auth/firebase';

class FetchDataTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            datas: null
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        fetch("https://myfirst-api-101.herokuapp.com/test-db/accounts")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    datas: json.data,
                    isLoading: false,
                })
            })
    }

    get Content(){
        const datas = this.state.datas
        let no = 0
        return (
            <Container>
                <Table>
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>username</th>
                            <th>asAdmin</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, index) => {
                            var role = 'user'
                            if(data.asAdmin)
                                role = 'admin'
                            return(
                                <tr key={index}>
                                    <th>{++no}</th>
                                    <td>{data.username}</td>
                                    <td>{role}</td>
                                    <td>{data.createdAt}</td>
                                    <td>{data.updatedAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }

    get Loader(){
        return <h3>Loading...</h3>
    }

    render(){
        return(
            <div>
                {this.state.isLoading ? this.Loader : this.Content}
                {/* {this.Loader} */}
            </div>
        )
    }
}

export default FetchDataTest;